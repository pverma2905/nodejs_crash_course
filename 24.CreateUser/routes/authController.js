const User = require("../models/User");

exports.signUp = async (req, res, next) => {
    try {
        const newUser = await User
        await newUser.save();
        res.status(200).json({ status: success, results: { newUser } })
    } catch (err) {
        res.status(400).json({ status: "Failed", message: "Error is creating new user " + err.message })
    }

}