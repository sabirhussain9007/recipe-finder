import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={recipe.image} alt={recipe.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{recipe.title}</div>
        <p className="text-gray-700 text-base">
          {recipe.summary && recipe.summary.replace(/<[^>]*>/g, '').substring(0, 100)}...
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Ready in: {recipe.readyInMinutes} minutes • Servings: {recipe.servings}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={`/recipe/${recipe.id}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;

