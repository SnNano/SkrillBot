const express = require("express");
const router = express.Router();
const { rewriteText } = require("../controllers/rewriterController");

router.route("/").post(rewriteText);

module.exports = router;
