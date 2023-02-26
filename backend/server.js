const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require("./config/db");

const app = express();

connectDB();

var corsOptions = {
  origin: '*',
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
// Webhooks and things
app.use('/stripe', require('./stripe'))
// Routes
app.use("/api/chatgpt", require("./routes/gptRoutes"));
app.use("/api/chimp", require("./routes/chimpRoutes"));
app.use("/api/random", require("./routes/randomRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/stripeRoutes"));
app.use("/api", require("./routes/checkcharacterRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});