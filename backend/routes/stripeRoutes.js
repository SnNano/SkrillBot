const express = require("express");
const router = express.Router();
// const bodyParser = require('body-parser')
// const { webhookPost } = require("../stripe/index");
const { subscribeStripe, cancelStripe, uncancelStripe } = require("../controllers/stripeController.js");
const { protect } = require("../middleware/authMiddleware");

// router.post("/webhook", bodyParser.raw({ type: 'application/json' }), webhookPost);
router.post("/stripe/subscribe", protect, subscribeStripe);
router.post("/stripe/cancel", protect, cancelStripe);
router.post("/stripe/uncancel", protect, uncancelStripe);


module.exports = router;