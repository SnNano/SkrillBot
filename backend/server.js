const express = require("express");
const dotenv = require("dotenv").config();
const cookieSession = require("cookie-session");

const passport = require("passport");
// const session = require('express-session');

const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require("./config/db");

const app = express();
require("./controllers/auth/passport");
require("./controllers/auth/passportGoogleSSO");


connectDB();

var corsOptions = {
  origin: `${process.env.DOMAIN}`,
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Webhooks and things
//app.use('/api/stripe', require('./stripe'))
// Routes
app.use("/api/chatgpt", require("./routes/gptRoutes"));
app.use("/api/rewrite", require("./routes/rewriterRoutes"));
app.use("/api/random", require("./routes/randomRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/stripe", require("./routes/stripeRoutes"));
app.use("/api", require("./routes/checkcharacterRoutes"));
app.use("/api", require("./routes/oauthRoutes"));


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});