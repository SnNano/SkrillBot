const express = require("express");
const router = express.Router();
const { registerUser, login, checkUserAuth, updatePhone, referralCode, checkGoogleAuth, logout } = require("../controllers/userController");
const { isUserAuthenticated } = require("../middleware/auth");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", login);
router.post("/phone-number", protect, updatePhone);
router.get("/:referralId", referralCode);
router.get("/auth/user", isUserAuthenticated, checkGoogleAuth);
router.get("/auth/refresh", protect, checkUserAuth);
router.get("/auth/logout", isUserAuthenticated, logout);


module.exports = router;