const express= require("express");


const app = express();
require("dotenv").config();

const PORT = 4300 

// adding middlewares
app.use(express.json());


// adding routes and mount this route 
const user = require("./Routes/Auth")
// mountion the routes 

app.use("/api/v1", user )

// starting a server 
app.listen(PORT, ()=>{
    console.log(`Your Server is Started at ${PORT}`)
})

// making connection with the database 

const DB_conection = require("./Config/db_connect")

DB_conection();