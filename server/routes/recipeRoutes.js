import express from 'express';
import {
  getRecipes,
  getRecipeById,
  getRandomRecipes,
  getRecipeNutrition,
  searchByIngredients
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/search', getRecipes); // Alternative search endpoint
router.get('/random/:count', getRandomRecipes);
router.get('/:id', getRecipeById);
router.get('/:id/nutrition', getRecipeNutrition);
router.get('/ingredients/search', searchByIngredients);

export default router;