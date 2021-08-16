const recipeService = jest.mock('./recipe.service.js');

let mockData = [];

recipeService.getAll = jest.fn(() => Promise.resolve(
    mockData)
);

recipeService.create = jest.fn((iData) => Promise.resolve(
    iData
));

recipeService.update = jest.fn((recipeid, name, category, time_need, difficulty, price_friendly, time_pre, time_cooking, degree, index, calory, description, ingredients, ingredients_quantity, ingredients_unit, img, story, portion) => Promise.resolve(
    {
        _id: recipeid, name: name,
        category: category,
        time_need: time_need,
        difficulty: difficulty,
        price_friendly: price_friendly,
        time_pre: time_pre,
        time_cooking: time_cooking,
        degree: degree,
        index: index,
        calory: calory,
        description: description,
        ingredients: ingredients,
        ingredients_quantity: ingredients_quantity,
        ingredients_unit: ingredients_unit,
        img: img,
        story: story,
        portion: portion
    }
))

recipeService.delete = jest.fn((_id) => Promise.resolve(

    // mockData.findIndex(i => i._id === _id);
    //     if (itemIndex < 0) {
    //     return null;
    // }
    // mockData.splice(mockData.findIndex(i => i._id === _id), 1)
    true
))

recipeService.__setMockData = data => mockData = data;

module.exports = recipeService;