const { mockRequest, mockResponse } = require('jest-mock-req-res')
const recipeController = require('./recipe.controller');
const recipeService = require('./recipe.service');

jest.mock('./recipe.service');

describe("Recipe controller", () => {
    const mockData = [{
        _id: "sd", name: 'Lencse',
        category: 'gr',
        time_need: 10,
        difficulty: 'khk',
        price_friendly: 'jhjf',
        time_pre: 42,
        time_cooking: 10,
        degree: 10,
        index: 100,
        calory: 50,
        description: ['első'],
        ingredients: ['alma'],
        ingredients_quantity: [2],
        ingredients_unit: ['dkg'],
        img: 'ggs',
        story: 'dfhdh',
        portion: 4,
    }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        recipeService.__setMockData(mockData);
        response = mockResponse();
    });

    test("Find all recipes", () => {

        const request = mockRequest();

        return recipeController.getRecipes(request, response, nextFunction)
            .then(() => {
                expect(recipeService.getAll).toBeCalledWith();
                expect(response.json).toBeCalledWith(mockData)
            })
    });

    test('Create a new recipe', () => {
        const NEW_RECIPE = {
            name: 'Lencse',
            category: 'gr',
            time_need: 10,
            difficulty: 'khk',
            price_friendly: 'jhjf',
            time_pre: 42,
            time_cooking: 10,
            degree: 10,
            index: 100,
            calory: 50,
            description: ['első'],
            ingredients: ['alma'],
            ingredients_quantity: [2],
            ingredients_unit: ['dkg'],
            img: 'ggs',
            story: 'dfhdh',
            portion: 4,
        };

        const request = mockRequest({
            method: 'POST',
            body: NEW_RECIPE
        });

        return recipeController.postRecipe(request, response, nextFunction)
            .then(() => {
                expect(recipeService.create).toBeCalledWith(NEW_RECIPE);
                expect(response.json).toBeCalledWith(NEW_RECIPE);
            })
    });

    // test('Update a new recipe', () => {
    //     const NEW_RECIPE = {
    //         name: 'Lencse',
    //         category: 'gr',
    //         time_need: 10,
    //         difficulty: 'khk',
    //         price_friendly: 'jhjf',
    //         time_pre: 42,
    //         time_cooking: 10,
    //         degree: 10,
    //         index: 100,
    //         calory: 50,
    //         description: ['első'],
    //         ingredients: ['alma'],
    //         ingredients_quantity: [2],
    //         ingredients_unit: ['dkg'],
    //         img: 'ggs',
    //         story: 'dfhdh',
    //         portion: 4,
    //     };

    //     const ID = 'sd'

    //     const request = mockRequest({
    //         method: 'PATCH',
    //         params: {
    //             id: ID,
    //         },
    //         body: NEW_RECIPE,
    //     });

    //     return recipeController.patchRecipe(request, response, nextFunction)
    //         .then(() => {
    //             expect(recipeService.update).toBeCalledWith(ID, NEW_RECIPE.name, NEW_RECIPE.category, NEW_RECIPE.time_need, NEW_RECIPE.difficulty, NEW_RECIPE.price_friendly, NEW_RECIPE.time_pre, NEW_RECIPE.time_cooking, NEW_RECIPE.time_need, NEW_RECIPE.degree, NEW_RECIPE.index, NEW_RECIPE.calory, NEW_RECIPE.description, NEW_RECIPE.ingredients, NEW_RECIPE.ingredients_quantity, NEW_RECIPE.ingredients_unit, NEW_RECIPE.img, NEW_RECIPE.story, NEW_RECIPE.portion);
    //             expect(response.json).toBeCalledWith({
    //                 _id: ID, name: NEW_RECIPE.name, category: NEW_RECIPE.category, time_need: NEW_RECIPE.time_need, difficulty: NEW_RECIPE.difficulty, price_friendly: NEW_RECIPE.price_friendly, time_pre: NEW_RECIPE.time_pre, time_cooking: NEW_RECIPE.time_cooking,
    //                 time_need: NEW_RECIPE.time_need, degree: NEW_RECIPE.degree, index: NEW_RECIPE.index, calory: NEW_RECIPE.calory, description: NEW_RECIPE.description, ingredients: NEW_RECIPE.ingredients, ingredients_quantity: NEW_RECIPE.ingredients_quantity, ingredients_unit: NEW_RECIPE.ingredients_unit, img: NEW_RECIPE.img, story: NEW_RECIPE.story, portion: NEW_RECIPE.portion
    //             });
    //         })
    // });

    test("Delete an recipe", () => {

        const ID = "ggghhgd"

        const request = mockRequest({
            params: {
                id: ID,
            },
        });

        return recipeController.deleteRecipe(request, response, nextFunction)
            .then(() => {
                expect(recipeService.delete).toBeCalledWith(ID);
                expect(response.json).toBeCalledWith(true)
            })
    });
});