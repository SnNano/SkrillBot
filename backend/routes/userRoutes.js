const express = require("express");
const router = express.Router();
const { registerUser, login, referralCode, checkGoogleAuth, logout } = require("../controllers/userController");
const { isUserAuthenticated } = require("../middleware/auth");

router.post("/", registerUser);
router.post("/login", login);
router.get("/:referralId", referralCode);
router.get("/auth/user", isUserAuthenticated, checkGoogleAuth);
router.get("/auth/logout", isUserAuthenticated, logout);


module.exports = router;