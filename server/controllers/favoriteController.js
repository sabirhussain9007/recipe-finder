import Favorite from '../models/Favorite.js';
import mongoose from 'mongoose';

// Simple in-memory storage fallback
let memoryFavorites = [];
let nextMemoryId = 1;

// Helper function to check MongoDB connection
const checkDBConnection = () => {
  return mongoose.connection.readyState === 1; // 1 = connected
};

export const addFavorite = async (req, res) => {
  try {
    const { recipeId, title, image } = req.body;
    
    if (!recipeId || !title) {
      return res.status(400).json({ 
        message: 'Recipe ID and title are required' 
      });
    }

    // Check if MongoDB is connected
    const dbConnected = checkDBConnection();
    
    if (dbConnected) {
      // Use MongoDB
      const existingFavorite = await Favorite.findOne({ recipeId });
      if (existingFavorite) {
        return res.status(409).json({ 
          message: 'Recipe is already in favorites' 
        });
      }

      const favorite = new Favorite({
        recipeId,
        title,
        image: image || null
      });

      await favorite.save();
      return res.status(201).json(favorite);
    } else {
      // Use memory storage
      console.log('⚠️ Using memory storage for favorites (MongoDB not available)');
      
      const existingFavorite = memoryFavorites.find(fav => fav.recipeId == recipeId);
      if (existingFavorite) {
        return res.status(409).json({ 
          message: 'Recipe is already in favorites' 
        });
      }

      const newFavorite = {
        _id: String(nextMemoryId++),
        recipeId,
        title,
        image: image || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      memoryFavorites.push(newFavorite);
      return res.status(201).json(newFavorite);
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }
    
    res.status(500).json({ 
      message: 'Failed to add favorite'
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    // Check if MongoDB is connected
    const dbConnected = checkDBConnection();
    
    if (dbConnected) {
      // Use MongoDB
      const favorites = await Favorite.find().sort({ createdAt: -1 });
      return res.json(favorites);
    } else {
      // Use memory storage
      console.log('⚠️ Using memory storage for favorites (MongoDB not available)');
      return res.json(memoryFavorites);
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ 
      message: 'Failed to fetch favorites'
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Favorite ID is required' });
    }

    // Check if MongoDB is connected
    const dbConnected = checkDBConnection();
    
    if (dbConnected) {
      // Use MongoDB
      const favorite = await Favorite.findByIdAndDelete(id);
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      return res.json({ message: 'Favorite removed successfully' });
    } else {
      // Use memory storage
      console.log('⚠️ Using memory storage for favorites (MongoDB not available)');
      
      const index = memoryFavorites.findIndex(fav => fav._id === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      
      memoryFavorites.splice(index, 1);
      return res.json({ message: 'Favorite removed successfully' });
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid favorite ID format' });
    }
    
    res.status(500).json({ 
      message: 'Failed to remove favorite'
    });
  }
};

// Utility function to check if a recipe is favorited
export const checkFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    if (!recipeId) {
      return res.status(400).json({ message: 'Recipe ID is required' });
    }

    // Check if MongoDB is connected
    const dbConnected = checkDBConnection();
    
    if (dbConnected) {
      // Use MongoDB
      const favorite = await Favorite.findOne({ recipeId });
      return res.json({ isFavorited: !!favorite });
    } else {
      // Use memory storage
      const favorite = memoryFavorites.find(fav => fav.recipeId == recipeId);
      return res.json({ isFavorited: !!favorite });
    }
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ 
      message: 'Failed to check favorite status'
    });
  }
};