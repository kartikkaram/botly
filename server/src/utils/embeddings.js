import { pipeline } from "@xenova/transformers";

let embedder;

export const initializeEmbedder = async () => {
    if (!embedder) {
        console.log("Loading the embedding model...");
        embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        console.log("Model loaded successfully.");
    }
};

export const getEmbedding = async (text) => {
    try {
        if (!embedder) {
            await initializeEmbedder();
        }
        const output = await embedder(text, { pooling: 'mean', normalize: true });
        return Array.from(output.data);
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
};