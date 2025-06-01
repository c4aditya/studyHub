const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true,
        trim:true,
    
    },

    lastName:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
          type:String,
          required:true,
          trim:true,
    },
    password:{
          type:String,
          required:true,   
    },

    confrimPassword:{
        type:String,
        required:true,
    },

    acconutType:{
        type:String,
        required:true,
        enum:["Admin", "Student" , "Instructor"]
    },
    otp:{
        type:String,
    },
    phoneNumber:{
        type:Number,
        required:true
    },
// it is basically reffer the profile of the  user , instructor , and adimin
    additionalDetails:{
       type:mongoose.Schema.Types.ObjectId,
    //    required:true,
       ref:"Profile",
    },

    courese:[
        {
             type:mongoose.Schema.Types.ObjectId,
               ref:"Course",
        }
    ],

    image:{
        type:String,
        
    
    },

    courseProgress :[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:"CourseProgress"
        }
    ]

})



module.exports = mongoose.model("User", user_schema)