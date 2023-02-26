const express = require("express");
const router = express.Router();
const { subscribeStripe, cancelStripe, uncancelStripe} = require("../controllers/stripeController");
const { protect } = require("../middleware/authMiddleware");

  router.post("/stripe/subscribe", protect, subscribeStripe);
  router.post("/stripe/cancel", cancelStripe);
  router.post("/stripe/uncancel", uncancelStripe);


module.exports = router;