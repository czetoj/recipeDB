const { mockRequest, mockResponse } = require('jest-mock-req-res')
const createError = require('http-errors');

const ingredientController = require('./ingredient.controller');
const ingredientService = require('./ingredient.service');

jest.mock('./ingredient.service');

describe("ingredient controller", () => {
    const mockData = [{ "_id": 1, "name": "mák", "unit": "gr", "calory": 10 },
    { "_id": 2, "name": "dió", "unit": "gr", "calory": 20 },
    { "_id": 3, "name": "mogyoró", "unit": "gr", "calory": 30 },
    { "_id": 4, "name": "alma", "unit": "db", "calory": 40 },
    { "_id": 5, "name": "liszt", "unit": "gr", "calory": 50 }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        ingredientService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find all", () => {

        const request = mockRequest();

        return ingredientController.getIngredients(request, response, nextFunction)
            .then(() => {
                expect(ingredientService.getAll);
                expect(response.json)
            })
    });
});