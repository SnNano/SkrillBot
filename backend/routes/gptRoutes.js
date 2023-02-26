const express = require("express");
const router = express.Router();
const { postPrompt, codePrompt } = require("../controllers/gptController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, postPrompt);
router.route("/code").post(protect, codePrompt);
module.exports = router;