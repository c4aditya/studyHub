
// This function is used for creating an OTP
const OTP = require("../Models/Otp");
const generateOTP = require("otp-generator")
const User = require("../Models/user")
// const Profile = require("../Models/profile")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")


// send otp function 
async function sendOtp(req, res) {
    var otp;
    try {
        const { email } = req.body;
        // perform some validation like email must not empty 
        if (!email) {
            return res.status(500).json({
                sucess: false,
                message: "Please fill the email "
            })
        }
        // let's check user is already exist or not 
        try {
            const existingUser = await User.findOne({ email })
            if (!existingUser) {
                // generaotr otp 
                otp = generateOTP.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                })
                console.log("OTP generated", otp)
                // chek OTO is unique or not 
                const uniqueOTP = await OTP.findOne({ otp: otp })
                // not a best apporach for creating an OTP you can use any API for this.
                while (uniqueOTP) {
                    otp = generateOTP.generate(6, {
                        upperCaseAlphabets: false,
                        lowerCaseAlphabets: false,
                        specialChars: false,
                    })
                    uniqueOTP = await findOne({ otp: otp })
                }
                // Make enty on the data base
                // create an Enty on DB 
                const OTPBody = await OTP.create({
                    email,
                    otp
                })
                console.log(OTPBody)
                return res.status(200).json({
                    sucess: true,
                    message: "The Otp is created sucessfully",
                    data: OTPBody,
                })
                //    send the email adding in future 
            }  else {
                return res.status(500).json({
                    sucess: false,
                    message: "User is All ready exixt please login whith your password "
                })}         
    
        } catch (error) {
            console.log("Getting error while make connnection with the data base ", error)
        }
        // if try block not working properly then move on catch block       
    }  catch (error) {
        console.log("getting  error while ")
    }
}
//---------------------------------------------- OTP function Ends---------------------------------------------------------------------------------------

//-----------------------------------------------SignUp function Start-----------------------------------------------------------------------------------
async function signUp(req, res) {

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confrimPassword,
            otp,
            acconutType,
            phoneNumber
        } = req.body;

        // validation

        if (!firstName || !lastName || !email || !password || !confrimPassword || !otp || !acconutType || !phoneNumber) {
            return res.status(500).json({
                suucess: false,
                message: "Please Enter All the details",
                // data:res
            })
        }

        // check is it existing user 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                sucess: false,
                message: "This user is already exist Please login !"
            })
        }

        // check the OTP is matched or not
        const otpChecked = await OTP.findOne({ email });
        if (!otpChecked) {
            return res.status(500).json({
                sucess: false,
                message: "OTP is not matched"
            })
        }

        //Chek password does't matchs 
        if(password ==!confrimPassword){
            return res.status(500).json({
                sucess:false,
                message:"Password and Confrim Password does Not Match"
            })
        }

        // hseh the password 
        let hassingPassword;
        try {
            hassingPassword = await bcrypt.hash(password, 10);
            console.log("Your hash password is ", hassingPassword);
            // ReadableStreamDefaultController  res.status(200).json({
            //     sucess:true,
            //     message:"The password is hashed sucessfully "
            // })

        }catch (error) {
            console.log("Getting problem while hassing the password ")
        }

        // make enty in the data base 

        // create an enty for ref's

        //    const profileDetails = await Profile.create({

        //     gender:null,
        //     contactNumber:null,
        //      address:null,
        //      about:null,

        //    })

        // Course ref
        const userData = await User.create({
            firstName,
            lastName,
            email,
            password: hassingPassword,
            confrimPassword,
            otp,
            //   additionalDetails:profileDetails._id,
            acconutType,
            phoneNumber,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        console.log(userData)
        return res.status(201).json({
            sucess: true,
            message: "You are login Sucessfully "
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Getting error while sign up"
        })
        console.log(error)
    }
}


//--------------------------------------------------------------signup ends -----------------------------------------------------------------------------------------------------

//--------------------------------------------------------------login starts-----------------------------------------------------------------------------------------------------

async function login(req,res){

    try{
      const {email ,password} = req.body;
      //validation 
      if(!email || !password){
        return res.status(500).json({
            sucess:false,
            message:"The Email and Paaword must be field"
        })
      }

      //check the email is signup or not 
      const user = await User.findOne({email})
      if(!user){
        return res.status(500).json({
            sucess:false,
            message:"Your are Not signup make sure you are sign In first"
        })}

        //password matching with hashpassword   
        const isPasswordMatch = await bcrypt.compare(password ,user.password);
        if(!isPasswordMatch){
            return res.status(500).json({
                sucess:false,
                message:"Password is not matched please try again"
            })
        }

        //creating JWT tokens 
        try{
            const payload =
            {
                id:user._id,
                role:user.role,
                acconutType:user.acconutType
            }

            const secrteKey ="Aditya";
            const token = JWT.sign(payload,secrteKey,{
                expiresIn:"2h"
            } )

            // creating a cookies
            const option={
                expiresIn : Date.now() + 9 * 24 *60 *60 *1000,
                httpOnly:true
            }
          user.token = token
           user.password =null,
            

            res.cookie("token",token ,option).status(200).json({
                sucess:true,
                message:"Cookie is creatd Login sucessfully",
                
                user:{
                    id:user._id,
                    email:user.email,
                    role:user.role,
                    token:token,
                }
                
            
            })

          console.log(user)
        }catch(error){
            console.log("error while creating a cookie" , error)
        }
        
     
      
    }catch(error){

        console.log("Error while login ", error)

    }

}

//-------------------------------------------------------------Login code ends-------------------------------------------------
//--------------------------------------------------------------reset code starts----------------------------------------------

async function changePassword(req,res){
    try{

        const {email ,password}= req.body;

        //chek the email is present or not 

        if(!email || !password){
            return res.status(500).json({
                sucess:false,
                message:"please enter email and password"
            })
        }
 
        // check email is signuped or not 
        const isExistingUser = await User.findOne({email})
        if(!isExistingUser){
            return res.status(500).json({
                sucess:false,
                message:"This is email is not registered make sure it is registured first"
            })
        }

        try{
       sendOtp();
       login()


        }catch(error){
            console.log(error)
        }

    }catch(error){
        console.log("Geeting error while reset the password ");
        
    }
}

module.exports = { sendOtp, signUp ,login};