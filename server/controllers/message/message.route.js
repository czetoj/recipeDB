const express = require('express');
const messageRouter = express.Router();
const messageController = require('./message.controller');

messageRouter.get('/messages', messageController.getMessages)
messageRouter.post('/messages', messageController.postMessage)
messageRouter.patch('/messages/:id', messageController.patchMessage)
messageRouter.delete('/messages/:id', messageController.deleteMessage)


module.exports = messageRouter;