const createError = require('http-errors')
const Message = require('../../models/recipe.model')
const messageService = require('./message.service')

exports.getMessages = async (req, res) => {
    let messages = await messageService.getAll()
    res.json(messages)
};

exports.postMessage = (req, res, next) => {
    const { email, sender, subject, message, status } = req.body;
    // if (!lastName || !firstName || !vaccine) {
    //     return next(
    //         new createError.BadRequest("Missing properties!")
    //     );
    // }

    const newMessage = new Message({
        email: email,
        sender: sender,
        subject: subject,
        message: message,
        status: status,
    });

    messageService.create(newMessage)
        .then(data => {
            res.status(201);
            res.json(data);
        });
}

exports.patchMessage = (req, res, next) => {

    const messageid = req.params.id

    const { email, sender, subject, message, status } = req.body;

    messageService.update(messageid, email, sender, subject, message, status)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.deleteMessage = async (req, res, next) => {
    const messageid = req.params.id

    try {
        await messageService.delete(messageid)
    } catch (err) {
        return next(new createError.NotFound("Vaccine is not found"));
    }
    res.json(true)
}