const mongoose = require("mongoose");

const user_profile = new  mongoose.Schema({
    
    gender:{
        tyepe:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    }
  
})



module.exports= mongoose.model("Profile", user_profile)