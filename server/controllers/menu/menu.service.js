const Menu = require('../../models/menu.model')

exports.getAll = () => Menu.find()

exports.create = (newMenu) => Menu.insertMany(newMenu)

exports.update = (menuid, name, soup, main, salad, dessert, week) => Menu.updateOne({ _id: menuid }, {
    name: name,
    soup: soup,
    main: main,
    salad: salad,
    dessert: dessert,
    week: week
})

exports.delete = (menuid) => Menu.findByIdAndDelete({ _id: menuid })