import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { PORT } from './config/env.js';



const app = express();



connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Recipe API Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Recipe API Documentation',
    endpoints: {
      'GET /api/health': 'Server health check',
      'GET /api/recipes?q={query}': 'Search recipes (returns 10 results)',
      'GET /api/recipes/search?q={query}': 'Search recipes (alternative endpoint)',
      'GET /api/recipes/{id}': 'Get recipe by ID',
      'GET /api/recipes/random/{count}': 'Get random recipes',
      'GET /api/recipes/{id}/nutrition': 'Get recipe nutrition',
      'GET /api/recipes/ingredients/search?ingredients={list}': 'Search by ingredients',
      'POST /api/favorites': 'Add to favorites',
      'GET /api/favorites': 'Get all favorites',
      'DELETE /api/favorites/{id}': 'Remove from favorites'
    },
    examples: {
      search: `http://localhost:${PORT}/api/recipes?q=pasta`,
      recipeById: `http://localhost:${PORT}/api/recipes/633858`,
      random: `http://localhost:${PORT}/api/recipes/random/5`,
      nutrition: `http://localhost:${PORT}/api/recipes/633858/nutrition`,
      ingredients: `http://localhost:${PORT}/api/recipes/ingredients/search?ingredients=tomato,cheese,basil`
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api`);
});


// server/server.js
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import recipeRoutes from './routes/recipeRoutes.js';
// import favoriteRoutes from './routes/favoriteRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Routes
// app.use('/api/recipes', recipeRoutes);
// app.use('/api/favorites', favoriteRoutes);

// // Basic health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Recipe Finder API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Root endpoint
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Welcome to Recipe Finder API',
//     endpoints: {
//       health: '/api/health',
//       recipes: '/api/recipes',
//       favorites: '/api/favorites'
//     }
//   });
// });

// // Error handling middleware (should be last)
// app.use(errorHandler);

// // Handle 404 errors
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     message: 'Route not found',
//     path: req.originalUrl 
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`✅ Server started on port ${port}`);
//   console.log(`📍 API URL: http://localhost:${port}`);
//   console.log(`🌐 Health check: http://localhost:${port}/api/health`);
  
//   // Check if API key is set
//   if (!process.env.SPOONACULAR_API_KEY) {
//     console.warn('⚠️  SPOONACULAR_API_KEY is not set in environment variables');
//   } else {
//     console.log('✅ Spoonacular API key is configured');
//   }
  
//   // Check if MongoDB URI is set
//   if (!process.env.MONGO_URI) {
//     console.warn('⚠️  MONGO_URI is not set, using default local MongoDB');
//   }
// });
