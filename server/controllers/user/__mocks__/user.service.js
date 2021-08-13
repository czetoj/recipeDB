

personService.findOne = jest.fn((id) => Promise.resolve(
    mockData.find((p) => p.id === id),
));