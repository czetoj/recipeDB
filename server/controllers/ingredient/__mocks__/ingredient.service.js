const ingredientService = jest.mock('./ingredient.service.js');

let mockData;

ingredientService.getAll = jest.fn(() => Promise.resolve(
    mockData)
);

ingredientService.__setMockData = data => mockData = data;

module.exports = ingredientService;