const express = require("express");
const router = express.Router();
const { postPrompt, codePrompt, postChatgpt } = require("../controllers/gptController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, postPrompt);
router.route("/code").post(protect, codePrompt);
router.route("/chat").post(protect, postChatgpt);

module.exports = router;