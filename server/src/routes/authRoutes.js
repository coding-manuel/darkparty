const express = require("express");
const router = express.Router();

const { getUsers, registerUser, loginUser, logOut, isAuthed } = require("../controller/authController");

router.get("/isauthed", isAuthed)
router.get("/getusers", getUsers)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logOut)

module.exports = router;