const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    email: String,
    sender: String,
    subject: String,
    message: String,
    status: String,
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);


module.exports = Message;