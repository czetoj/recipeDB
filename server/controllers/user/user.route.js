const express = require('express');
const userRouter = express.Router();
const userController = require('./user.controller');

userRouter.get('/', userController.getUsers)
userRouter.get('/:id', userController.getUser)
userRouter.post('/', userController.postUser)
userRouter.patch('/:id', userController.patchUser)
userRouter.delete('/:id', userController.deleteUser)


module.exports = userRouter;