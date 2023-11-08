const User = require("../models/userModel");

//user routes
exports.getAllUsers = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}
exports.createUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}
exports.getUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}
exports.updateUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}


exports.updateProfile = async (req, res, next) => {
    const {name,email} = req.body;
    const newUser = {name,email}
    const updateUser = await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ status:'success', results: {updateUser }})

}

exports.deleteUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}





    









