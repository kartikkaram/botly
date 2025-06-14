const vectorStore = []; // [{ embedding: [...], context: {input, output}, botId }]

export const addToVectorStore = (embedding, context, botId) => {
  vectorStore.push({ embedding, context, botId });
};

export const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(vecB.reduce((sum, val) => sum + val ** 2, 0));
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
