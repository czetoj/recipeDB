

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
