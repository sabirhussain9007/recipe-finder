import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/favorites'; // Replace with your backend URL

export const getFavorites = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const addFavorite = async (recipeId) => {
  try {
    const response = await axios.post(API_BASE_URL, { recipeId });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

