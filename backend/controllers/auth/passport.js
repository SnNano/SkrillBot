const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("../../models/userModel");
const JWTStrategy = require('passport-jwt');


passport.use(
  new JWTStrategy.Strategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.body.token || req.query.token || req.headers['x-access-token']) {
          token = req.headers['x-access-token'] ;
        }
        return token;
      },
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      if (!jwtPayload) {
        return done('No token found...');
      }
      return done(null, jwtPayload);
    }
  )
);




// passport.use(
//   new StrategyJwt(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     function (jwtPayload, done) {
//       return User.findOne({ where: { id: jwtPayload.id } })
//         .then((user) => {
//           return done(null, user);
//         })
//         .catch((err) => {
//           return done(err);
//         });
//     }
//   )
// );