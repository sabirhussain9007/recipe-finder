import React, { useState, useEffect } from 'react';
import FavoritesList from '../components/FavoritesList';
import { getFavorites } from '../services/favoriteService';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch favorites');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with Loader.jsx
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My Favorite Recipes</h1>
      <FavoritesList favorites={favorites} />
    </div>
  );
}

export default Favorites;