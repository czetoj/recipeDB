const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name: String,
    category: String,
    time_need: Number,
    difficulty: String,
    price_friendly: String,
    time_pre: Number,
    time_cooking: Number,
    degree: Number,
    index: Number,
    calory: Number,
    description: Array,
    ingredients: Array,
    ingredients_quantity: Array,
    ingredients_unit: Array,
    img: String,
    story: String,
    portion: Number,
}, {
    timestamps: true
});

const Recipe = mongoose.model("Recipe", recipeSchema);


module.exports = Recipe;