
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe } from '../services/recipeservice.js';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch recipe');
        console.error('Recipe fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    } else {
      setError('No recipe ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto mt-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading recipe...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h3 className="font-bold mb-2">Error</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto mt-8 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
        <p>Recipe not found.</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 max-w-4xl">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          
          {/* Recipe Metadata */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            {recipe.readyInMinutes && (
              <span>⏱️ Ready in {recipe.readyInMinutes} minutes</span>
            )}
            {recipe.servings && (
              <span>👥 Serves {recipe.servings}</span>
            )}
            {recipe.healthScore && (
              <span>❤️ Health score: {recipe.healthScore}/100</span>
            )}
          </div>

          {/* Summary/Description */}
          {recipe.summary && (
            <div 
              className="prose prose-lg mb-6"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          )}

          {/* Ingredients */}
          {recipe.extendedIngredients && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1">
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
              <div 
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </div>
          )}

          {/* Nutrition Info if available */}
          {recipe.nutrition && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {recipe.nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-semibold">{nutrient.name}</div>
                    <div>{Math.round(nutrient.amount)}{nutrient.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Info */}
          {recipe.sourceUrl && (
            <div className="border-t pt-4 mt-6">
              <a 
                href={recipe.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View original recipe
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        ← Back to Recipes
      </button>
    </div>
  );
};

export default RecipeDetails;