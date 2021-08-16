const userService = jest.mock('./user.service.js');

let mockData = [];

userService.getAll = jest.fn(() => Promise.resolve(
    mockData)
);

userService.create = jest.fn((iData) => Promise.resolve(
    iData
));

userService.update = jest.fn((userid, firstName, lastName, nickName, email, password, countOfRecipes, start, role) => Promise.resolve(
    {
        _id: userid, firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        email: email,
        password: password,
        countOfRecipes: countOfRecipes,
        start: start,
        role: role
    }
))

userService.delete = jest.fn((_id) => Promise.resolve(

    // mockData.findIndex(i => i._id === _id);
    //     if (itemIndex < 0) {
    //     return null;
    // }
    // mockData.splice(mockData.findIndex(i => i._id === _id), 1)
    true
))

userService.__setMockData = data => mockData = data;

module.exports = userService;

// personService.findOne = jest.fn((id) => Promise.resolve(
//     mockData.find((p) => p.id === id),
// ));