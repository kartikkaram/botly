

export const cosineSimilarity = (vecA, vecB) => {
  const flatVecA = vecA.flat();
  const flatVecB = vecB.flat();

  const dot = flatVecA.reduce((sum, val, i) => sum + val * flatVecB[i], 0);
  const normA = Math.sqrt(flatVecA.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(flatVecB.reduce((sum, val) => sum + val ** 2, 0));

  return dot / (normA * normB);
};


export const calculateDistanceMatrix = (data) => {
  // Filter out invalid data
  const validData = data.filter(
    (item) =>
      item.embedding &&
      Array.isArray(item.embedding) &&
      item.embedding.flat().length > 0 // Ensure the embedding is not an empty array
  );

  if (validData.length === 0) {
    throw new Error("No valid data with embeddings to process.");
  }

  const n = validData.length;
  const distanceMatrix = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      try {
        // Flatten embeddings for comparison
        const similarity = cosineSimilarity(
          validData[i].embedding.flat(),
          validData[j].embedding.flat()
        );
        distanceMatrix[i][j] = 1 - similarity; // Distance is 1 - similarity
        distanceMatrix[j][i] = distanceMatrix[i][j];
      } catch (error) {
        console.error(`Error calculating similarity between items ${i} and ${j}:`, error);
      }
    }
  }
  

  return distanceMatrix;
};
export const estimateBestEps = (distanceMatrix, k = 1) => {
  const n = distanceMatrix.length;

  // Step 1: Get sorted k-distances
  const kDistances = distanceMatrix.map((row, i) => {
    const distances = [...row];
    distances.splice(i, 1); // remove self-distance
    distances.sort((a, b) => a - b);
    return distances[k - 1];
  }).sort((a, b) => a - b);

  // Step 2: Define 2D points for elbow detection
  const points = kDistances.map((val, i) => ({ x: i, y: val }));

  // Line endpoints
  const start = points[0];
  const end = points[points.length - 1];

  // Step 3: Find point with max distance to the line (curvature)
  const getPerpendicularDistance = (point) => {
    const numerator = Math.abs(
      (end.y - start.y) * point.x -
      (end.x - start.x) * point.y +
      end.x * start.y -
      end.y * start.x
    );
    const denominator = Math.sqrt(
      (end.y - start.y) ** 2 + (end.x - start.x) ** 2
    );
    return numerator / denominator;
  };

  let maxDistance = -1;
  let bestIndex = -1;

  for (let i = 1; i < points.length - 1; i++) {
    const dist = getPerpendicularDistance(points[i]);
    if (dist > maxDistance) {
      maxDistance = dist;
      bestIndex = i;
    }
  }

  return kDistances[bestIndex];
};




export const dbscan = (distanceMatrix, eps, minPts = 2) => {
  const n = distanceMatrix.length;
  const visited = new Array(n).fill(false);
  const clusters = [];
  const noise = new Set();
  
  const getNeighbors = (pointIdx) => {
    return distanceMatrix[pointIdx]
      .map((dist, idx) => (dist <= eps ? idx : -1))
      .filter((idx) => idx !== -1);
  };

  const expandCluster = (pointIdx, neighbors, cluster) => {
    cluster.push(pointIdx);
    visited[pointIdx] = true;

    for (let i = 0; i < neighbors.length; i++) {
      const neighborIdx = neighbors[i];
      if (!visited[neighborIdx]) {
        visited[neighborIdx] = true;
        const neighborNeighbors = getNeighbors(neighborIdx);
        if (neighborNeighbors.length >= minPts) {
          neighbors.push(...neighborNeighbors.filter(n => !neighbors.includes(n)));
        }
      }

      if (!cluster.includes(neighborIdx)) {
        cluster.push(neighborIdx);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    const neighbors = getNeighbors(i);

    if (neighbors.length < minPts) {
      noise.add(i);
    } else {
      const cluster = [];
      expandCluster(i, neighbors, cluster);
      clusters.push(cluster);
    }
  }

  return clusters;
};

