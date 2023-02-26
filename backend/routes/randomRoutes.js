const express = require("express");
const router = express.Router();
const { getRandomUser } = require("../controllers/randomUser");

router.route("/").get(getRandomUser);
module.exports = router;