// // controllers/recipeController.js
// import axios from 'axios';
// import Recipe from '../models/Recipe.js';

// const EDAMAM_API_BASE_URL = 'https://api.edamam.com/api/recipes/v2';
// const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
// const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

// const getRecipes = async (req, res) => {
//     try {
//         const { q } = req.query;

//         if (!q) {
//             return res.status(400).json({ message: 'Query parameter "q" is required' });
//         }

//         const apiUrl = `${EDAMAM_API_BASE_URL}?type=public&q=${q}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;

//         const response = await axios.get(apiUrl);
//         const recipes = response.data.hits.map(hit => hit.recipe);

//         res.json(recipes);
//     } catch (error) {
//         console.error('Error fetching recipes:', error);
//         res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
//     }
// };

// const getRecipeById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const apiUrl = `${EDAMAM_API_BASE_URL}/${id}?type=public&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
//         const response = await axios.get(apiUrl);
//         const recipe = response.data.recipe;

//         if (!recipe) {
//             return res.status(404).json({ message: 'Recipe not found' });
//         }

//         res.json(recipe);
//     } catch (error) {
//         console.error('Error fetching recipe by ID:', error);
//         res.status(500).json({ message: 'Failed to fetch recipe', error: error.message });
//     }
// };

// export {
//     getRecipes,
//     getRecipeById
// };


import axios from 'axios';
import { SPOONACULAR_API_KEY } from '../config/env.js';

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

export const getRecipes = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({ 
                message: 'Search query parameter "q" is required' 
            });
        }

        const response = await axios.get(
            `${SPOONACULAR_BASE_URL}/complexSearch`, {
                params: {
                    query: q,
                    apiKey: SPOONACULAR_API_KEY,
                    number: 10,
                    addRecipeInformation: true
                }
            }
        );
        
        res.json(response.data.results || []);
    } catch (error) {
        console.error('Error fetching recipes:', error.response?.data || error.message);
        
        if (error.response?.status === 402) {
            return res.status(502).json({ 
                message: 'External API quota exceeded. Please try again later.' 
            });
        }
        
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Valid recipe ID is required' });
        }

        const response = await axios.get(
            `${SPOONACULAR_BASE_URL}/${id}/information`, {
                params: {
                    apiKey: SPOONACULAR_API_KEY
                }
            }
        );
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipe by ID:', error.response?.data || error.message);
        
        if (error.response?.status === 404) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.status(500).json({ message: 'Failed to fetch recipe' });
    }
};

export const getRandomRecipes = async (req, res) => {
    try {
        const { count } = req.params;
        const numRecipes = parseInt(count) || 5;
        
        if (numRecipes <= 0 || numRecipes > 20) {
            return res.status(400).json({ 
                message: 'Count must be between 1 and 20' 
            });
        }

        const response = await axios.get(
            `${SPOONACULAR_BASE_URL}/random`, {
                params: {
                    apiKey: SPOONACULAR_API_KEY,
                    number: numRecipes
                }
            }
        );
        
        res.json(response.data.recipes || []);
    } catch (error) {
        console.error('Error fetching random recipes:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to fetch random recipes' });
    }
};

export const getRecipeNutrition = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Valid recipe ID is required' });
        }

        const response = await axios.get(
            `${SPOONACULAR_BASE_URL}/${id}/nutritionWidget.json`, {
                params: {
                    apiKey: SPOONACULAR_API_KEY
                }
            }
        );
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipe nutrition:', error.response?.data || error.message);
        
        if (error.response?.status === 404) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.status(500).json({ message: 'Failed to fetch recipe nutrition' });
    }
};

export const searchByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.query;
        
        if (!ingredients || ingredients.trim() === '') {
            return res.status(400).json({ 
                message: 'Ingredients parameter is required' 
            });
        }

        const response = await axios.get(
            `${SPOONACULAR_BASE_URL}/findByIngredients`, {
                params: {
                    ingredients: ingredients,
                    apiKey: SPOONACULAR_API_KEY,
                    number: 10,
                    ignorePantry: true,
                    ranking: 1
                }
            }
        );
        
        res.json(response.data || []);
    } catch (error) {
        console.error('Error searching by ingredients:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to search by ingredients' });
    }
};