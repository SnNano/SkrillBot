const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc   register user
// @route  POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password){
        res.status(401);
        throw new Error("Fields should not be empty");
    }
    // Checking if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(401);
        throw new Error("Email already exists");
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = await User.create({username:username, email:email, password:hashedPassword});
   if(newUser){
    delete newUser.password
    res.status(201).json({
        newUser,
        token:generateToken(newUser.id)
    });
   } else {
    res.status(401);
        throw new Error("Invalid data");
   }
});

// @desc   login
// @route  POST /api/users/login
// @access  Public
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    // Find user
    const user = await User.findOne({email});
    // Check password
    if(user && (await bcrypt.compare(password, user.password)) ){
        delete user.password
        res.status(201).json({
            user,
            token: generateToken(user.id),
          });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
      }
});

const generateToken = (id)=>{
   return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"2d"});
}

module.exports = {
    registerUser,
    login
}