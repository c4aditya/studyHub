const mongoose = require("mongoose");

const Subsections = new  mongoose.Schema({

    title:{
        type:String,

    },

    timeDuraxtion:{
        type:String,
    },

    descripction:{
        type:String,
    },

    videoUrl:{
        type:String,
    }
    


    
})



module.exports= mongoose.model("Subsections",Subsections )