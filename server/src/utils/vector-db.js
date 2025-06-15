const vectorStore = []; // [{ embedding: [...], context: {input, output}, botId }]

export const addToVectorStore = (embedding, context, botId) => {
  vectorStore.push({ embedding, context, botId });
};

export const cosineSimilarity = (vecA, vecB) => {
  const flatVecA = vecA.flat();
  const flatVecB = vecB.flat();

  const dot = flatVecA.reduce((sum, val, i) => sum + val * flatVecB[i], 0);
  const normA = Math.sqrt(flatVecA.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(flatVecB.reduce((sum, val) => sum + val ** 2, 0));

  return dot / (normA * normB);
};


export const getTopKMatches = (queryEmbedding, botId, k = 3) => {
  const filtered = vectorStore.filter((item) => item.botId === botId);
  const scored = filtered.map((item) => ({
    ...item,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, k);
};
