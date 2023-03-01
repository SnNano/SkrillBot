const passport = require("passport");
// const { isUserAuthenticated } = require("../middlewares/auth");
const jwt = require('jsonwebtoken');

const successLoginUrl = "http://localhost:3000";
const errorLoginUrl = "http://localhost:3000/login";

const loginGoogle = (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] }, (err, user, info) => {
    if (err) {
      console.error(err);
      res.redirect("/error");
    } else if (!user) {
      res.redirect("/login");
    } else {
      req.login(user, (err) => {
        if (err) {
          console.error(err);
          res.redirect("/error");
        } else {
          res.redirect("/dashboard");
        }
      });
    }
  })(req, res);
};

const googleCallback = (req, res) => {
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl
  })(req, res, () => {
    //res.redirect('http://localhost:3000')
  });
};



module.exports = {
  googleCallback, loginGoogle
};