const createError = require('http-errors')
const User = require('../../models/user.model')
const userService = require('./user.service')

exports.getUsers = async (req, res) => {
    const email = req.query.email

    if (email) {
        try {
            users = await userService.query(email)
        } catch (err) {
            return next(new createError.NotFound("User is not found"));
        }
        res.json(users)
    } else {
        try {
            users = await userService.getAll()
        } catch (err) {
            return next(new createError.NotFound("Users are not found"));
        }
        res.json(users)
    }
};
exports.getUser = async (req, res, next) => {
    const userid = req.params.id

    try {
        user = await userService.get(userid)
    } catch (err) {
        return next(new createError.NotFound("User is not found"));
    }

    res.json(user)
};

exports.postUser = async (req, res, next) => {
    const { firstName, lastName, nickName, email, password, countOfRecipes, start, role } = req.body;

    if (!email || !password) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        email: email,
        password: password,
        countOfRecipes: countOfRecipes,
        start: start,
        role: role
    };

    userService.create(newUser)
        .then(data => {
            res.status(201);
            res.json(data);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.patchUser = async (req, res, next) => {

    const userid = req.params.id

    const { firstName, lastName, nickName, email, password, countOfRecipes, start, role } = req.body;

    userService.update(userid, firstName, lastName, nickName, email, password, countOfRecipes, start, role)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(new createError.BadRequest(err));
        });
}

exports.deleteUser = async (req, res, next) => {
    const userid = req.params.id

    try {
        await userService.delete(userid);
    } catch (err) {
        return next(new createError.NotFound("User is not found"));
    }

    res.json(true)
}