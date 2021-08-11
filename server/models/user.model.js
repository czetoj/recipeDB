const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    email: String,
    password: String,
    countOfRecipes: Number,
    start: Date,
    role: String,
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);


module.exports = User;