import axios from 'axios';

const API_KEY = '35be580b79494f36bf863e691f74d3bb';

// Function to fetch list of games
export const fetchGames = async (params = {}) => {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: API_KEY,
        page_size: 12,
        ...params
      }
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch details for a specific game
export const fetchGameDetails = async (id) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: API_KEY
      }
    });
    console.log("Game Details Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch game screenshots
export const fetchGameScreenshots = async (id) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/screenshots`, {
      params: {
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};