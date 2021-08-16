const menuService = jest.mock('./menu.service.js');

let mockData = [];

menuService.getAll = jest.fn(() => Promise.resolve(
    mockData)
);

menuService.create = jest.fn((iData) => Promise.resolve(
    iData
));

menuService.update = jest.fn((menuid, name, soup, main, salad, dessert, week) => Promise.resolve(
    { _id: menuid, name: name, soup: soup, main: main, salad: salad, dessert: dessert, week: week }
))

menuService.delete = jest.fn((_id) => Promise.resolve(

    // mockData.findIndex(i => i._id === _id);
    //     if (itemIndex < 0) {
    //     return null;
    // }
    // mockData.splice(mockData.findIndex(i => i._id === _id), 1)
    true
))

menuService.__setMockData = data => mockData = data;

module.exports = menuService;