const { mockRequest, mockResponse } = require('jest-mock-req-res')
const ingredientController = require('./ingredient.controller');
const ingredientService = require('./ingredient.service');

jest.mock('./ingredient.service');

describe("Ingredient controller", () => {
    const mockData = [{ _id: "sd", name: "mák", unit: "gr", calory: 10 },
    { _id: "kll", name: "dió", unit: "gr", calory: 20 },
    { _id: "kk", name: "mogyoró", unit: "gr", calory: 30 },
    { _id: "jkk", name: "alma", unit: "db", calory: 40 },
    { _id: "hdjj", name: "liszt", unit: "gr", calory: 50 }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        ingredientService.__setMockData(mockData);
        response = mockResponse();
    });

    test("Find all ingredients", () => {

        const request = mockRequest();

        return ingredientController.getIngredients(request, response, nextFunction)
            .then(() => {
                expect(ingredientService.getAll).toBeCalledWith();
                expect(response.json).toBeCalledWith(mockData)
            })
    });

    test('Create a new ingredient', () => {
        const NEW_ING = {
            name: 'Lencse',
            unit: 'gr',
            calory: 42,
        };

        const request = mockRequest({
            method: 'POST',
            body: NEW_ING
        });

        return ingredientController.postIngredient(request, response, nextFunction)
            .then(() => {
                expect(ingredientService.create).toBeCalledWith(NEW_ING);
                expect(response.json).toBeCalledWith(NEW_ING);
            })
    });

    test('Update a new ingredient', () => {
        const NEW_ING = {
            name: 'Lencse',
            unit: 'gr',
            calory: 42,
        };

        const ID = 'sd'

        const request = mockRequest({
            method: 'PATCH',
            params: {
                id: ID,
            },
            body: NEW_ING,
        });

        return ingredientController.patchIngredient(request, response, nextFunction)
            .then(() => {
                expect(ingredientService.update).toBeCalledWith(ID, NEW_ING.name, NEW_ING.unit, NEW_ING.calory);
                expect(response.json).toBeCalledWith({ _id: ID, name: NEW_ING.name, unit: NEW_ING.unit, calory: NEW_ING.calory });
            })
    });

    test("Delete an ingredient", () => {

        const ID = "ggghhgd"

        const request = mockRequest({
            params: {
                id: ID,
            },
        });

        return ingredientController.deleteIngredient(request, response, nextFunction)
            .then(() => {
                expect(ingredientService.delete).toBeCalledWith(ID);
                expect(response.json).toBeCalledWith(true)
            })
    });
});