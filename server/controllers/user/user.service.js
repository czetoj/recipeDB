const User = require('../../models/user.model')

exports.getAll = () => User.find()

exports.get = (id) => User.findOne({ _id: id })

exports.query = (email) => User.find({ email: email })

exports.create = (newUser) => User.create(newUser)

exports.update = (userid, firstName, lastName, nickName, email, password, countOfRecipes, start, role) => User.updateOne({ _id: userid }, {
    firstName: firstName,
    lastName: lastName,
    nickName: nickName,
    email: email,
    password: password,
    countOfRecipes: countOfRecipes,
    start: start,
    role: role
})

exports.delete = (userid) => User.findByIdAndDelete({ _id: userid })