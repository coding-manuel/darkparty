const express = require("express");
const router = express.Router();

const {  } = require("../controller/movieController");

router.post("/upload", (req, res) => {
    res.send("less go")
})

module.exports = router;