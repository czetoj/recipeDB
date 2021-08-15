const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    email: String,
    countOfRecipes: Number,
    start: Date,
    role: String,
}, {
    timestamps: true
});

userSchema.plugin(mongooseBcrypt)

const User = mongoose.model("User", userSchema);


module.exports = User;