const messageService = jest.mock('./message.service.js');

let mockData = [];

messageService.getAll = jest.fn(() => Promise.resolve(
    mockData)
);

messageService.create = jest.fn((iData) => Promise.resolve(
    iData
));

messageService.update = jest.fn((messageid, email, sender, subject, message, status) => Promise.resolve(
    { _id: messageid, email: email, sender: sender, subject: subject, message: message, status: status }
))

messageService.delete = jest.fn((_id) => Promise.resolve(

    // mockData.findIndex(i => i._id === _id);
    //     if (itemIndex < 0) {
    //     return null;
    // }
    // mockData.splice(mockData.findIndex(i => i._id === _id), 1)
    true
))

messageService.__setMockData = data => mockData = data;

module.exports = messageService;