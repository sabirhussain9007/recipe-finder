import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Export environment variables with fallbacks
export const PORT = process.env.PORT || 5000;
export const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app';

// Log to verify environment variables are loaded (remove in production)
console.log('Environment variables loaded:');
console.log('PORT:', PORT);
console.log('MONGODB_URI:', MONGODB_URI ? 'Loaded successfully' : 'Not found');
console.log('SPOONACULAR_API_KEY:', SPOONACULAR_API_KEY ? 'Loaded successfully' : 'Not found');