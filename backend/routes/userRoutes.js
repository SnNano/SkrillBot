const express = require("express");
const router = express.Router();
const { registerUser, login, referralCode } = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", login);
router.get("/:referralId", referralCode);


module.exports = router;