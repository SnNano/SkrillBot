const express = require("express");
const router = express.Router();
const { subscribeStripe, cancelStripe, uncancelStripe } = require("../controllers/stripeController.js");
const { protect } = require("../middleware/authMiddleware");

router.post("/stripe/subscribe", protect, subscribeStripe);
router.post("/stripe/cancel", protect, cancelStripe);
router.post("/stripe/uncancel", protect, uncancelStripe);


module.exports = router;