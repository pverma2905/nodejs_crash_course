const express = require("express");
const usersRouter = express.Router();
const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require("../controllers/userController");
const { signup, login, forgetPassword,resetPassword } = require("../controllers/authController");


usersRouter.post("/signup",signup)
usersRouter.post("/login",login)
usersRouter.post("/forgetPassword",forgetPassword)
usersRouter.patch("/resetPassword/:token",resetPassword)
usersRouter.post("/resetPassword/:token",resetPassword)
usersRouter.route('/').get(getAllUsers).post(createUser)
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = usersRouter