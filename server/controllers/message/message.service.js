const Message = require('../../models/message.model')

exports.getAll = () => Message.find()

exports.create = (newMessage) => Message.insertMany(newMessage)

exports.update = (messageid, email, sender, subject, message, status) => Message.updateOne({ _id: messageid }, {
    email: email,
    sender: sender,
    subject: subject,
    message: message,
    status: status,
})

exports.delete = (messageid) => Message.findByIdAndDelete({ _id: messageid })