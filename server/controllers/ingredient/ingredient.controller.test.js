const { mockRequest, mockResponse } = require('jest-mock-req-res')
const createError = require('http-errors');
// const Ingredient = require('../../models/ingredient.model')

const ingredientController = require('./ingredient.controller');
const ingredientService = require('./ingredient.service');

jest.mock('./ingredient.service');

describe("Ingredient controller", () => {
    const mockData = [{ _id: "sd", name: "mák", name: "gr", calory: 10 },
    { _id: "kll", name: "dió", name: "gr", calory: 20 },
    { _id: "kk", name: "mogyoró", name: "gr", calory: 30 },
    { _id: "jkk", name: "alma", name: "db", calory: 40 },
    { _id: "hdjj", name: "liszt", name: "gr", calory: 50 }];

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
                expect(ingredientService.getAll);
                expect(response.json)
            })
    });

    // test('Create a new ingredient', () => {
    //     const NEW_ING = {
    //         name: 'Lencse',
    //         unit: 'gr',
    //         calory: 42,
    //     };

    //     const request = mockRequest({
    //         method: 'POST',
    //         body: {
    //             name: "Lencse",
    //             unit: "gr",
    //             calory: 42,
    //         },
    //     });

    //     return ingredientController.postIngredient(request, response, nextFunction)
    //         .then(() => {
    //             expect(ingredientService.create).toBeCalledWith(NEW_ING);
    //             expect(response.json).toBeCalledWith(NEW_ING);
    //         })
    // });

    test("Delete ingredients", () => {

        const ID = "ggghhgd"

        const request = mockRequest({
            params: {
                id: ID,
            },
        });

        return ingredientController.deleteIngredient(request, response, nextFunction)
            .then(() => {
                expect(ingredientService.delete);
                expect(response.json)
            })
    });
});