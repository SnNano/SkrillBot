const express = require("express");
const router = express.Router();
const { registerUser, login, checkUserAuth, updateCharacters, checkGoogleAuth, logout } = require("../controllers/userController");
const { isUserAuthenticated } = require("../middleware/auth");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/:referralId", registerUser);
router.post("/", registerUser);
// router.post("/phone-number", protect, updatePhone);
// router.get("/:referralId", referralCode);
router.get("/update-characters", protect, updateCharacters);
router.get("/auth/user", isUserAuthenticated, checkGoogleAuth);
router.get("/auth/refresh", protect, checkUserAuth);
router.get("/auth/logout", logout);


module.exports = router;