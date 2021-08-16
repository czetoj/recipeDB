const { mockRequest, mockResponse } = require('jest-mock-req-res')
const messageController = require('./message.controller');
const messageService = require('./message.service');

jest.mock('./message.service');

describe("Message controller", () => {
    const mockData = [{ _id: "sd", email: "mák", sender: "gr", subject: "jkj", message: "jjfa", status: "hhdfjjk" }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        messageService.__setMockData(mockData);
        response = mockResponse();
    });

    test("Find all messages", () => {

        const request = mockRequest();

        return messageController.getMessages(request, response, nextFunction)
            .then(() => {
                expect(messageService.getAll).toBeCalledWith();
                expect(response.json).toBeCalledWith(mockData)
            })
    });

    test('Create a new message', () => {
        const NEW_MES = {
            email: 'Lencse',
            sender: 'gr',
            subject: 'hkaf',
            message: 'khk',
            status: 'jhjf',
        };

        const request = mockRequest({
            method: 'POST',
            body: NEW_MES
        });

        return messageController.postMessage(request, response, nextFunction)
            .then(() => {
                expect(messageService.create).toBeCalledWith(NEW_MES);
                expect(response.json).toBeCalledWith(NEW_MES);
            })
    });

    test('Update a new message', () => {
        const NEW_MES = {
            email: 'Lencse',
            sender: 'gr',
            subject: 'hhj',
            messsage: 'hjjj',
            status: 'jsjgk'
        };

        const ID = 'sd'

        const request = mockRequest({
            method: 'PATCH',
            params: {
                id: ID,
            },
            body: NEW_MES,
        });

        return messageController.patchMessage(request, response, nextFunction)
            .then(() => {
                expect(messageService.update).toBeCalledWith(ID, NEW_MES.email, NEW_MES.sender, NEW_MES.subject, NEW_MES.message, NEW_MES.status);
                expect(response.json).toBeCalledWith({ _id: ID, email: NEW_MES.email, sender: NEW_MES.sender, subject: NEW_MES.subject, message: NEW_MES.message, status: NEW_MES.status });
            })
    });

    test("Delete a message", () => {

        const ID = "ggghhgd"

        const request = mockRequest({
            params: {
                id: ID,
            },
        });

        return messageController.deleteMessage(request, response, nextFunction)
            .then(() => {
                expect(messageService.delete).toBeCalledWith(ID);
                expect(response.json).toBeCalledWith(true)
            })
    });
});