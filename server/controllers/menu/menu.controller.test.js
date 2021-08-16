const { mockRequest, mockResponse } = require('jest-mock-req-res')
const menuController = require('./menu.controller');
const menuService = require('./menu.service');

jest.mock('./menu.service');

describe("Menu controller", () => {
    const mockData = [{ _id: "sd", name: "mák", soup: "gr", main: "jkj", salad: "jjfa", dessert: "hhdfjjk", week: 3 }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        menuService.__setMockData(mockData);
        response = mockResponse();
    });

    test("Find all menus", () => {

        const request = mockRequest();

        return menuController.getMenus(request, response, nextFunction)
            .then(() => {
                expect(menuService.getAll).toBeCalledWith();
                expect(response.json).toBeCalledWith(mockData)
            })
    });

    test('Create a new menu', () => {
        const NEW_MENU = {
            name: 'Lencse',
            soup: 'gr',
            main: 'hkaf',
            salad: 'khk',
            dessert: 'jhjf',
            week: 42,
        };

        const request = mockRequest({
            method: 'POST',
            body: NEW_MENU
        });

        return menuController.postMenu(request, response, nextFunction)
            .then(() => {
                expect(menuService.create).toBeCalledWith(NEW_MENU);
                expect(response.json).toBeCalledWith(NEW_MENU);
            })
    });

    test('Update a new menu', () => {
        const NEW_MENU = {
            name: 'Lencse',
            soup: 'gr',
            main: 'hkaf',
            salad: 'khk',
            dessert: 'jhjf',
            week: 42,
        };

        const ID = 'sd'

        const request = mockRequest({
            method: 'PATCH',
            params: {
                id: ID,
            },
            body: NEW_MENU,
        });

        return menuController.patchMenu(request, response, nextFunction)
            .then(() => {
                expect(menuService.update).toBeCalledWith(ID, NEW_MENU.name, NEW_MENU.soup, NEW_MENU.main, NEW_MENU.salad, NEW_MENU.dessert, NEW_MENU.week);
                expect(response.json).toBeCalledWith({ _id: ID, name: NEW_MENU.name, soup: NEW_MENU.soup, main: NEW_MENU.main, salad: NEW_MENU.salad, dessert: NEW_MENU.dessert, week: NEW_MENU.week });
            })
    });

    test("Delete an menu", () => {

        const ID = "ggghhgd"

        const request = mockRequest({
            params: {
                id: ID,
            },
        });

        return menuController.deleteMenu(request, response, nextFunction)
            .then(() => {
                expect(menuService.delete).toBeCalledWith(ID);
                expect(response.json).toBeCalledWith(true)
            })
    });
});