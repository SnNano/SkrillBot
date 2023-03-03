const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc   register user
// @route  POST /api/users
// @access  Public
const characterLimit = asyncHandler(async (req, res) => {
    // Checking if user exists
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
        res.status(401);
        throw new Error("User doesnt exist");
    }
    res.json({ characters: user.characters });
});

const characterUsed = asyncHandler(async (req, res) => {
    // Checking if user exists
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
        res.status(401);
        throw new Error("User doesnt exist");
    }
    res.json({ characters: user.characters });
});

module.exports = {
    characterLimit
}
