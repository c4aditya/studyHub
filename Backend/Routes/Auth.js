const express = require('express');


const router = express.Router();

const {sendOtp,signUp,login} = require("../Controllers/Auth");

router.post("/sendOtp" , sendOtp)
router.post("/signup",signUp)
router.post("/login", login)

module.exports = router;
