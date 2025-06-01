const mongoose = require("mongoose");

async function Db_connect (){

    try{

    await mongoose.connect("mongodb://localhost:27017/StudyHub")

    console.log("Date base is connected sucessfully !")

    }

    catch(error){
        console.log("There is some issue occur while making coinnection with the data base ");
        
    }

  
}

module.exports = Db_connect;