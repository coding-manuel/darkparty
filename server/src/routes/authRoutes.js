const express = require("express");
const router = express.Router();

const { getUsers, registerUser, loginUser } = require("../controller/authController");

router.get("/getusers", getUsers)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router;