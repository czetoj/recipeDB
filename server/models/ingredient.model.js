const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    calory: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);


module.exports = Ingredient;