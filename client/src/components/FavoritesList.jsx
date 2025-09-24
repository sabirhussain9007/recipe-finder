import React from 'react';
import RecipeCard from './RecipeCard.jsx';

const FavoritesList = ({ favorites }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((favorite) => (
        <RecipeCard key={favorite._id} recipe={favorite.recipe} />
      ))}
    </div>
  );
}

export default FavoritesList;