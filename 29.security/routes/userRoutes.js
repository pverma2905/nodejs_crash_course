const express = require("express");
const usersRouter = express.Router();
const { getAllUsers, createUser, getUser, updateUser, deleteUser, updateProfile } = require("../controllers/userController");
const { signup, login, forgetPassword,resetPassword,protectData, changePassword } = require("../controllers/authController");


usersRouter.post("/signup",signup)
usersRouter.post("/login",login)
usersRouter.post("/forgetPassword",forgetPassword)
usersRouter.patch("/resetPassword/:token",resetPassword)
usersRouter.patch("/changePassword",protectData,changePassword)
usersRouter.patch("/changePassword",protectData,changePassword)
usersRouter.patch("/updateProfile",protectData,updateProfile)


usersRouter.route('/').get(getAllUsers).post(createUser)
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = usersRouter