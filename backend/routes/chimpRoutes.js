const express = require("express");
const router = express.Router();
const { rewriteChimp } = require("../controllers/chimpRewriter");

router.route("/").post(rewriteChimp);
module.exports = router;