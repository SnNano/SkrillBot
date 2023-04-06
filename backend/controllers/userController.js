const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const stripe = require('../middleware/stripe')
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { sendEmail } = require("../controllers/emailController");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// @desc   register user
// @route  POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const referralId = req.params.referralId;

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
    if (referralId) {
        const referredBy = await User.findOne({ referralId: req.params.referralId });
        user.referredBy = referredBy;
        user.save();
    }
    const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.DOMAIN}users/${user.id}/verify/${token.token}`;
    sendEmail(user.email, url);

    if (user) {
        delete user.password
        res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                googleId: user.googleId,
                email: user.email,
                customerId: user.customerId,
                characters: user.characters,
                charactersUsed: user.charactersUsed,
                charctersUpdated: user.charctersUpdated,
                plan: user.plan,
                referralId: user.referralId
            },
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid data");
    }
});


const verifyEmail = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            res.status(400).send({ message: "Invalid link" });
            throw new Error("Invalid link");
        }

        await User.updateOne({ _id: user._id, verified: true });
        await token.remove();

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})


// @desc   login
// @route  POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    // Check password
    if (user && (await bcrypt.compare(password, user.password))) {
        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.DOMAIN}users/${user.id}/verify/${token.token}`;
                sendEmail(user.email, url);
            }

            return res
                .status(400)
                .send({ message: "An Email sent to your account please verify" });
        }
        delete user.password
        res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                googleId: user.googleId,
                email: user.email,
                customerId: user.customerId,
                characters: user.characters,
                charctersUpdated: user.charctersUpdated,
                charactersUsed: user.charactersUsed,
                plan: user.plan,
                referralId: user.referralId
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
// const referralCode = asyncHandler(async (req, res) => {
//     const referredBy = await User.findOne({ referralId: req.params.referralId });
//     if (!referredBy) {
//         // handle invalid referral code or self-referral
//         res.status(400).json({ error: 'Invalid referral code' });
//     } else {
//         // give some reward to referredBy and referredTo
//         referredBy.characters = referredBy.characters + 5000;
//         await referredBy.save();
//         console.log("Rewards added successfully'")
//         res.json({ message: 'Rewards added successfully' });
//     }
// });

const updateCharacters = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });

    if (user.charactersUsed >= 2000 && user.referredBy) {
        const referrer = await User.findOne({ _id: user.referredBy });
        console.log(referrer)
        if (!referrer.charctersUpdated) {
            referrer.characters += 5000;
            referrer.charctersUpdated = true;
            await referrer.save();
        }
    }
    res.send({ message: 'Characters updated successfully' });
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
            email: req.user.email,
            characters: req.user.characters,
            charctersUpdated: req.user.charctersUpdated,
            charactersUsed: req.user.charactersUsed,
            plan: req.user.plan,
            referralId: req.user.referralId
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
            email: user.email,
            customerId: user.customerId,
            characters: user.characters,
            charctersUpdated: user.charctersUpdated,
            charactersUsed: user.charactersUsed,
            plan: user.plan,
            referralId: user.referralId
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
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

module.exports = {
    registerUser, checkUserAuth,
    login, checkGoogleAuth, updateCharacters,
    logout, updatePhone, verifyEmail
}