const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name: String,
    soup: String,
    main: String,
    salad: String,
    dessert: String,
    week: Number
}, {
    timestamps: true
});

const Menu = mongoose.model("Menu", menuSchema);


module.exports = Menu;