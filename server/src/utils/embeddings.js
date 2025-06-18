import {pipeline} from '@xenova/transformers';

let embedder;

export const getEmbeddings = async (text) => {
  // Load the model only once
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  const output = await embedder(text, {
    pooling: 'mean',      // mean pooling across token embeddings
    normalize: true       // cosine similarity optimized
  });

  return [Array.from(output.data)];
};
