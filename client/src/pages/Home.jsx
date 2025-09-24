import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import RecipeList from '../components/RecipeList.jsx';
import { searchRecipes } from '../services/recipeservice.js';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial load (e.g., popular recipes)
    handleSearch(''); // Or fetch popular recipes
  }, []);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchRecipes(searchTerm);
      setRecipes(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading...</div>} {/* Replace with Loader.jsx */}
      {error && <div>Error: {error}</div>}
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Home;