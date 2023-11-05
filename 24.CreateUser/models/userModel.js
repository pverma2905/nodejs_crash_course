const mongoose = require("mongoose");
const validate = require("validator");



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid  email"]
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid  email"]
    },
    password: {
        type: String,
        required: [true, "user password is required"],
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, "user password confirmation is required"],
        minLength: 8
    },
    photo: String,




})

const User = mongoose.model('User', userSchema)
module.exports = User;