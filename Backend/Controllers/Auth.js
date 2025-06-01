
// This function is used for creating an OTP
const OTP = require("../Models/Otp");
const generateOTP = require("otp-generator")
const User = require("../Models/user")
const bcrypt = require("bcrypt")


// send otp function 

async function sendOtp(req ,res){
    var otp;
    try{

         const {email} = req.body;

    // perform some validation like email must not empty 

    if(!email){
        return res.status(500).json({
            sucess:false,
            message:"Please fill the email "
        })
    }


    // let's check user is already exist or not 


    try{

        const existingUser = await User.findOne({email})
        if(!existingUser){
            // generaotr otp 
         otp = generateOTP.generate(6 ,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
         })

         console.log("OTP generated" , otp)
       // chek OTO is unique or not 

       const uniqueOTP = await OTP.findOne({otp : otp})

       while(uniqueOTP){
           otp = generateOTP.generate(6 ,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
         })
           uniqueOTP = await findOne({otp : otp})
       }

       // Make enty on the data base 


       // create an Enty on DB 

       const OTPBody = await OTP.create({
        email,
        otp
       })
       console.log(OTPBody)


       return res.status(200).json({
        sucess:true,
        message:"The Otp is created sucessfully",
        data:OTPBody,
       })

    //    send the email 

 


        }
        

        else{
            return res.status(500).json({
                sucess:false,
                message:"User is All ready exixt please login whith your password "
            })
        }
            
    }

    

    catch(error){
        console.log("Getting error while make connnection with the data base " ,error)
    }

    }

    catch(error){
        console.log("getting  error while ")
    }
   


}





// signip

async function signUp(req ,res){

    try{

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

        if(!firstName || !lastName || !email || !password ||  !confrimPassword || !otp || !acconutType || !phoneNumber){
          return res.status(500).json({
            suucess:false,
            message:"Please Enter All the details",
            // data:res
          })

          
        }

        // check is it existing user 

        const isExistingUser = await User.findOne({email}) ;

        if(isExistingUser){
           
            return res.status(500).json({
                sucess:false,
                message:"This user is already exist Please login !"
            })
        }

        // check the OTP is matched or not 

        const otpChecked = await OTP.findOne({email});

        if(!otpChecked ){
            return res.status(500).json({
                sucess:false,
                message:"OTP is not matched"
            })
        }

        // hseh the password 
        let hassingPassword ;
       try{
         hassingPassword =  await bcrypt.hash(password , 10);

        console.log("Your hash password is ",hassingPassword);

        // ReadableStreamDefaultController  res.status(200).json({
        //     sucess:true,
        //     message:"The password is hashed sucessfully "
        // })

       }

       catch(error){
        console.log("Getting problem while hassing the password ")
       }
        
       // make enty in the data base 

      const userData = await User.create({

              firstName,
              lastName,
              email,
              password : hassingPassword,
              confrimPassword,
              otp,
              acconutType,
              phoneNumber

       })   

       console.log(userData)


       return res.status(201).json({
        sucess:true,
        message:"You are login Sucessfully "
       })


        

    }


    catch(error){
      
        res.status(500).json({
            sucess:false,
            message:"Getting error while sign up"
        })

        console.log(error)

    }
}



// login



// change password 

module.exports=  {sendOtp , signUp} ;