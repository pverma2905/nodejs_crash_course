const express = require("express");
const usersRouter = express.Router();
const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require("../controllers/userController");
const { signup, login } = require("../controllers/authController");


usersRouter.post("/signup",signup)
usersRouter.post("/login",login)
usersRouter.route('/').get(getAllUsers).post(createUser)
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = usersRouter