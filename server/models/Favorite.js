import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    recipeId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model('Favorite', favoriteSchema);
