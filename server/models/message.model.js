const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'függő'
    }
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);


module.exports = Message;