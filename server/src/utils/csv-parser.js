import csv from 'csv-parser'
import fs from 'fs'


export const csvParser = (uploadPath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(uploadPath)
      .pipe(csv())
      .on('data', (data) => results.push(data)) // Collect data
      .on('end', () => resolve(results)) // Resolve with results
      .on('error', (error) => reject(error)); // Handle errors
  });
};
