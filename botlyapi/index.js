import axios from "axios";

export async function Botly(inputMessage, botKey) {
  try {
    const response = await axios.post('http://localhost:3001/bot-api/botResponse',
         { 
            userMessage: inputMessage
         }
        , {
      headers: {
         apikey: botKey,
      }
    });

    return response.data.data;
  } catch (error) {
      if (error.response) {
      throw new Error(error.response.data?.message || 'Server returned an error');
    } else if (error.request) {
      throw new Error('No response from server. Please try again later.');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
}