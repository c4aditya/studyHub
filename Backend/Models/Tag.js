const mongoose = require("mongoose");

const tag_schema = new mongoose.Schema({

    name:{
        type:Stirng,
         required:true,

    },
    descropction:{
        type:String,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }

})


module.exports = mongoose.model("Tag" , tag_schema)