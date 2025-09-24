
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    label: { type: String, required: true },
    image: { type: String },
    url: { type: String },
    ingredients: [{ type: String }],
    
});

export default mongoose.model('Recipe', recipeSchema);
