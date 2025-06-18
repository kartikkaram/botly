

export const cosineSimilarity = (vecA, vecB) => {
  const flatVecA = vecA.flat();
  const flatVecB = vecB.flat();

  const dot = flatVecA.reduce((sum, val, i) => sum + val * flatVecB[i], 0);
  const normA = Math.sqrt(flatVecA.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(flatVecB.reduce((sum, val) => sum + val ** 2, 0));

  return dot / (normA * normB);
};

