const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");

// for otp send we use premiddleware at in rhe otp model 
 

const otpSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },

    otp:{
        type:String,
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
        expires:8*60,
    }

})


// here we add the code for sending varification email

async function sendVerificationEmail(email ,otp){

    try{
     
         const responce = await mailSender(email , "This mail is form varifaction otp ", otp);
         console.log("Otp has send sucessfully" , responce)
    }

    catch(error){

        console.log("There is an some Problem for while sending an mail" , error)

    }
   // addin premiddle wares 

}

    otpSchema.pre("Save" , async function(next){
    await sendVerificationEmail(this.email ,this.otp);
    next();
})






module.exports = mongoose.model("Otp" , otpSchema)