const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const stripe = require('../middleware/stripe')
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc   register user
// @route  POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(401);
        throw new Error("Fields should not be empty");
    }
    // Checking if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(401);
        throw new Error("Email already exists");
    }
    // // Checking if phone number exists
    // const phoneExists = await User.findOne({ phone: phone });
    // if (phoneExists) {
    //     res.status(401);
    //     throw new Error("User already exists");
    // }

    const customer = await stripe.customers.create({
        email: `${req.body.email}`,
        name: `${req.body.username}`
    });
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const user = await User.create({
        username: username, email: email,
        password: hashedPassword, customerId: customer.id,
    });
    if (user) {
        delete user.password
        res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                googleId: user.googleId,
                phone: user.phone,
                email: user.email,
                customerId: user.customerId,
                characters: user.characters,
                plan: user.plan,
            },
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid data");
    }
});

// @desc   login
// @route  POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    // Check password
    if (user && (await bcrypt.compare(password, user.password))) {
        delete user.password
        res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                googleId: user.googleId,
                phone: user.phone,
                email: user.email,
                customerId: user.customerId,
                characters: user.characters,
                plan: user.plan,
            },
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc   referral
// @route  POST /api/users/:referralId
// @access  Public
const referralCode = asyncHandler(async (req, res) => {
    const referredBy = await User.findOne({ referralId: req.params.referralId });
    if (!referredBy) {
        // handle invalid referral code or self-referral
        res.status(400).json({ error: 'Invalid referral code' });
    } else {
        // give some reward to referredBy and referredTo
        referredBy.characters = referredBy.characters + 5000;
        await referredBy.save();
        console.log("Rewards added successfully'")
        res.json({ message: 'Rewards added successfully' });
    }
});

// @desc   google auth
// @route  GET /api/users/auth
// @access  Public
const checkGoogleAuth = (req, res) => {
    // res.json({ user: req.user, token: generateToken(req.user._id) });
    res.json({
        user: {
            _id: req.user._id,
            username: req.user.username,
            googleId: req.user.googleId,
            customerId: req.user.customerId,
            phone: req.user.phone,
            email: req.user.email,
            characters: req.user.characters,
            plan: req.user.plan,
        },
        token: generateToken(req.user._id)
    });
}
const checkUserAuth = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
        res.status(401);
        throw new Error("User doesnt Exist");
    }
    res.json({
        user: {
            _id: user._id,
            username: user.username,
            googleId: user.googleId,
            phone: user.phone,
            email: user.email,
            customerId: user.customerId,
            characters: user.characters,
            plan: user.plan,
        },
        token: generateToken(user._id)
    });
})
// @desc   logout
// @route  POST /api/users/logout
// @access  Public
const logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: "logged out" })
};
// @desc   update user adding phone number
// @route  POST /api/users/phone-number
// @access  Public
const updatePhone = asyncHandler(async (req, res) => {

    const { email, phone } = req.body;
    const user = await User.findOne({ email });
    const userPhone = await User.findOne({ phone })
    if (!user) {
        res.status(401);
        throw new Error("User doesnt exist")
    }
    if (phone.length < 10) {
        res.status(401);
        throw new Error("No less than 10")
    }
    if (userPhone) {
        res.status(401);
        throw new Error("Phone number exists")
    }
    user.phone = phone;
    user.save();
    res.status(200).json({
        user,
        token: generateToken(user._id),
    });
})
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
}

module.exports = {
    registerUser, checkUserAuth,
    login, checkGoogleAuth,
    referralCode, logout, updatePhone
}