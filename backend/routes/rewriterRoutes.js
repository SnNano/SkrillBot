const express = require("express");
const router = express.Router();
const { rewriteText } = require("../controllers/rewriterController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, rewriteText);

module.exports = router;
