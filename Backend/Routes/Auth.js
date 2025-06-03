const express = require('express');


const router = express.Router();

const {sendOtp,signUp,login} = require("../Controllers/Auth");

router.post("/sendOtp" , sendOtp)
router.post("/signup",signUp)
router.post("/login", login)

// adding middlewars for autherazation 

const {auth , isStudent , isInstructor} = require("../Middlewares/auth")

router.get("/test", auth ,(req ,res)=>{

    res.status(200).json({
        sucess:true,
        message:"This is a route for test an auth middle wares"
    })
})


router.get("/student" , auth , isStudent, (req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"Welcome to the protected Route of student"
    })
})

router.get("/instructor" , auth , isInstructor , (req ,res)=>{
    res.status(200).json({
        sucess:true,
        message:"This is protected route for Admin"
    })
})

module.exports = router;
