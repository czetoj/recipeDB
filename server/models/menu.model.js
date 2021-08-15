const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    soup: {
        type: String,
        required: true
    },
    main: {
        type: String,
        required: true
    },
    salad: {
        type: String,
        required: true
    },
    dessert: {
        type: String,
        required: true
    },
    week: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Menu = mongoose.model("Menu", menuSchema);


module.exports = Menu;