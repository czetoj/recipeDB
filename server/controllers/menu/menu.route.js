const express = require('express');
const menuRouter = express.Router();
const menuController = require('./menu.controller');

menuRouter.get('/menus', menuController.getMenus)
menuRouter.post('/menus', menuController.postMenu)
menuRouter.patch('/menus/:id', menuController.patchMenu)
menuRouter.delete('/menus/:id', menuController.deleteMenu)


module.exports = menuRouter;