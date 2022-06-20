const express = require("express");
const router = express.Router();

const { getUsers, registerUser, loginUser, logOut, isAuthed } = require("../controller/authController");

router.get("/getusers", getUsers)

router.post("/isauthed", isAuthed)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logOut)

module.exports = router;