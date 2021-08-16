const { mockRequest, mockResponse } = require('jest-mock-req-res')
const userController = require('./user.controller');
const userService = require('./user.service');

jest.mock('./user.service');

describe("User controller", () => {
    const mockData = [{
        _id: "sd", firstName: 'kkk',
        lastName: 'jjjj',
        nickName: 'hhhhh',
        email: 'hgfj',
        password: 'hhhh',
        countOfRecipes: 10,
        start: 'jkkk',
        role: 'jhjj'
    }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        userService.__setMockData(mockData);
        response = mockResponse();
    });

    test("Find all users", () => {

        const request = mockRequest();

        return userController.getUsers(request, response, nextFunction)
            .then(() => {
                expect(userService.getAll).toBeCalledWith();
                expect(response.json).toBeCalledWith(mockData)
            })
    });

    test('Create a new user', () => {
        const NEW_USER = {
            firstName: 'kkk',
            lastName: 'jjjj',
            nickName: 'hhhhh',
            email: 'hgfj',
            password: 'hhhh',
            countOfRecipes: 10,
            start: 'jkkk',
            role: 'jhjj'
        };

        const request = mockRequest({
            method: 'POST',
            body: NEW_USER
        });

        return userController.postUser(request, response, nextFunction)
            .then(() => {
                expect(userService.create).toBeCalledWith(NEW_USER);
                expect(response.json).toBeCalledWith(NEW_USER);
            })
    });

    test('Update a new user', () => {
        const NEW_USER = {
            firstName: 'kkk',
            lastName: 'jjjj',
            nickName: 'hhhhh',
            email: 'hgfj',
            password: 'hhhh',
            countOfRecipes: 10,
            start: 'jkkk',
            role: 'jhjj'
        };

        const ID = 'sd'

        const request = mockRequest({
            method: 'PATCH',
            params: {
                id: ID,
            },
            body: NEW_USER,
        });

        return userController.patchUser(request, response, nextFunction)
            .then(() => {
                expect(userService.update).toBeCalledWith(ID, NEW_USER.firstName, NEW_USER.lastName, NEW_USER.nickName, NEW_USER.email, NEW_USER.password, NEW_USER.countOfRecipes, NEW_USER.start, NEW_USER.role);
                expect(response.json).toBeCalledWith({ _id: ID, firstName: NEW_USER.firstName, lastName: NEW_USER.lastName, nickName: NEW_USER.nickName, email: NEW_USER.email, password: NEW_USER.password, countOfRecipes: NEW_USER.countOfRecipes, start: NEW_USER.start, role: NEW_USER.role });
            })
    });

    test("Delete an user", () => {

        const ID = "ggghhgd"

        const request = mockRequest({
            params: {
                id: ID,
            },
        });

        return userController.deleteUser(request, response, nextFunction)
            .then(() => {
                expect(userService.delete).toBeCalledWith(ID);
                expect(response.json).toBeCalledWith(true)
            })
    });
});

// test('Find one with invalid id', async () => {
//     const PERSON_ID = 10;

//     const request = mockRequest({
//         params: {
//             id: PERSON_ID,
//         },
//     });

//     await personController.findOne(request, response, nextFunction);
//     expect(personService.findOne).toBeCalledWith(PERSON_ID);
//     expect(response.json).not.toBeCalledWith(mockData.find((p) => p.id === PERSON_ID));
// });
