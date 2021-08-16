const app = require('./app');
const mongoose = require('mongoose');
const request = require('supertest');
// const User = require('./models/user.model');
// const userRoute = require('./controllers/user/user.route')
// const { response } = require('express');

describe('REST API integration tests', () => {
    const newUser =
    {
        firstName: 'John',
        lastName: 'Test',
        email: 'john@test.com'
    };

    beforeEach(done => {
        mongoose
            .connect(`${process.env.MONGODB_HOST}${process.env.DATABASE}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                done();
            })
            .catch(err => {
                logger.error(err);
                process.exit();
            });
    });


    test('POST User', async () => {
        const response = await request(app)
            .post("/users")
            .send(newUser);
        // expect(response.statusCode).toBe(201)
        // expect(response.body.firstName).toBe(newUser.firstName)
        // expect(response.body.done).toBe(newUser.done)
    })

    // test('GET /users', () => {
    //     return User.insertMany(insertData)
    //         .then(() => supertest(app).use(userRoute).expect(200))
    //         .then(response => {
    //             expect(Array.isArray(response.body)).toBeTruthy();
    //             expect(response.body.length).toEqual(insertData.length);

    //             response.body.forEach((user, index) => {
    //                 expect(user.firstName).toBe(insertData[index].firstName);
    //                 expect(user.lastName).toBe(insertData[index].lastName);
    //                 expect(user.email).toBe(insertData[index].email);
    //             });
    //         });

    // });


});