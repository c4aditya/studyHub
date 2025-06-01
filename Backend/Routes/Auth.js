const express = require('express');


const router = express.Router();

const {sendOtp,signUp} = require("../Controllers/Auth");

router.post("/sendOtp" , sendOtp)
router.post("/signup",signUp)

module.exports = router;
