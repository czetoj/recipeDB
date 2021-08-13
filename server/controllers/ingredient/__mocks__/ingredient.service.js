const ingredientService = jest.mock('./ingredient.service.js');

let mockData = [];

ingredientService.getAll = jest.fn(() => Promise.resolve(
    mockData)
);

ingredientService.create = jest.fn((iData) => Promise.resolve(
    iData
));

ingredientService.update = jest.fn((ingredientid, name, unit, calory) => Promise.resolve(
    { _id: ingredientid, name: name, unit: unit, calory: calory }
))

ingredientService.delete = jest.fn((_id) => Promise.resolve(

    // mockData.findIndex(i => i._id === _id);
    //     if (itemIndex < 0) {
    //     return null;
    // }
    // mockData.splice(mockData.findIndex(i => i._id === _id), 1)
    {}
))

ingredientService.__setMockData = data => mockData = data;

module.exports = ingredientService;