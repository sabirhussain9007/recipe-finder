// import express from 'express';
// import {
//   addFavorite,
//   getFavorites,
//   removeFavorite
// } from '../controllers/favoriteController.js';

// const router = express.Router();

// router.post('/', addFavorite);
// router.get('/', getFavorites);
// router.delete('/:id', removeFavorite);

// export default router;


import express from 'express';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  checkFavorite
} from '../controllers/favoriteController.js';

const router = express.Router();

router.post('/', addFavorite);
router.get('/', getFavorites);
router.delete('/:id', removeFavorite);
router.get('/check/:recipeId', checkFavorite); // Check if a recipe is favorited

export default router;