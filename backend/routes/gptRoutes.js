const express = require("express");
const router = express.Router();
const { postPrompt, codePrompt, postChatgpt, getEssay } = require("../controllers/gptController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, postPrompt);
router.route("/essay").post(protect, getEssay);
router.route("/code").post(protect, codePrompt);
router.route("/chat").post(protect, postChatgpt);

module.exports = router;