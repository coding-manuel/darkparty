const express = require("express");
const router = express.Router();

const { generateUrl } = require("../controller/movieController");

router.post("/generateUrl", generateUrl)

module.exports = router;