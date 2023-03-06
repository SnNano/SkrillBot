const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const stripe = require('../../middleware/stripe')

const User = require("../../models/userModel");

const GOOGLE_CALLBACK_URL = `${API_DOMAIN}auth/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const customer = await stripe.customers.create({
        email: `${profile.emails[0].value}`,
        name: `${profile.name.givenName}`
      });
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123secretpassword", salt);
      const defaultUser = {
        username: `${profile.name.givenName}`,
        email: profile.emails[0].value,
        customerId: customer.id,
        password: hashedPassword,
        googleId: profile.id,
      };
      let user = await User.findOne({ googleId: profile.id });
      //const token = generateToken(user._id)
      if (!user) {
        user = await User.create(defaultUser);
      }

      if (user) return cb(null, user);
    }
  )
);


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ _id: id }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user);

  if (user) cb(null, user);
});