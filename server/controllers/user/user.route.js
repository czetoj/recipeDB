const express = require('express');
const userRouter = express.Router();
const userController = require('./user.controller');

userRouter.get('/users', userController.getUsers)
userRouter.get('/users/:id', userController.getUser)
userRouter.post('/users', userController.postUser)
userRouter.patch('/users/:id', userController.patchUser)
userRouter.delete('/users/:id', userController.deleteUser)


module.exports = userRouter;