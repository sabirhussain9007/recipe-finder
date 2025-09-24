import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for error handling
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      throw new Error('Recipe not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    } else if (!navigator.onLine) {
      throw new Error('No internet connection');
    } else {
      throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
  }
);

export const searchRecipes = async (searchTerm) => {
  try {
    // Handle empty search term
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }

    const response = await apiClient.get('/recipes', {
      params: { q: searchTerm.trim() }
    });
    
    return response.data || [];
  } catch (error) {
    console.error('Error searching recipes:', error.message);
    throw error; // Re-throw to let component handle it
  }
};

export const getRecipe = async (id) => {
  try {
    if (!id) {
      throw new Error('Recipe ID is required');
    }

    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error.message);
    throw error; // Re-throw to let component handle it
  }
};

export const getRandomRecipes = async (count = 5) => {
  try {
    const response = await apiClient.get(`/recipes/random/${count}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching random recipes:', error.message);
    throw error;
  }
};

export const getRecipeNutrition = async (id) => {
  try {
    if (!id) {
      throw new Error('Recipe ID is required');
    }

    const response = await apiClient.get(`/recipes/${id}/nutrition`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe nutrition:', error.message);
    throw error;
  }
};

export const searchByIngredients = async (ingredients) => {
  try {
    if (!ingredients || ingredients.trim() === '') {
      return [];
    }

    const response = await apiClient.get('/recipes/ingredients/search', {
      params: { ingredients: ingredients.trim() }
    });
    
    return response.data || [];
  } catch (error) {
    console.error('Error searching by ingredients:', error.message);
    throw error;
  }
};