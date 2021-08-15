const createError = require('http-errors')
const Menu = require('../../models/menu.model')
const menuService = require('./menu.service')

exports.getMenus = async (req, res) => {
    let menus = await menuService.getAll()
    res.json(menus)
};

exports.postMenu = (req, res, next) => {
    const { name, soup, main, salad, dessert, week } = req.body;
    if (!name || !soup || !main || !salad || !dessert || !week) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newMenu = new Menu({
        name: name,
        soup: soup,
        main: main,
        salad: salad,
        dessert: dessert,
        week: week
    });

    menuService.create(newMenu)
        .then(data => {
            res.status(201);
            res.json(data);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.patchMenu = (req, res, next) => {

    const menuid = req.params.id

    const { name, soup, main, salad, dessert, week } = req.body;

    menuService.update(menuid, name, soup, main, salad, dessert, week)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.deleteMenu = async (req, res, next) => {
    const menuid = req.params.id

    try {
        await menuService.delete(menuid)
    } catch (err) {
        return next(new createError.NotFound("Vaccine is not found"));
    }
    res.json(true)
}