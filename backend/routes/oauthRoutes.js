const express = require("express");
const router = express.Router();
const { googleCallback, loginGoogle } = require("../controllers/oauthController");


router.get("/auth/google", loginGoogle);
router.get("/auth/google/callback", googleCallback);

module.exports = router;