const express = require("express");
const router = express.Router();
const { characterLimit} = require("../controllers/checkCharacters");
const { protect } = require("../middleware/authMiddleware");

router.get("/characterLimit", protect, characterLimit);


module.exports = router;