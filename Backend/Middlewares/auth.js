const jwt = require("jsonwebtoken");
const secrteKey ="Aditya";

function auth(req,res,next){
    // fetching the token 
    const token = req.body.token;
    // verify  the token 
    try{
    const decode = jwt.verify(token , secrteKey );
    if(!decode){
        return res.status(401).json({
            sucess:false,
            message:"The token is empty"
        })
    }
        req.user = decode 
        next();

}catch(error){
     return res.status(500).json({
        sucess:false,
        message:"The token is invalid"
     })
}
}

function isStudent(req,res,next){
    try{
      if(req.user.acconutType !=="Student"){
        return res.status(500).json({
            sucess:false,
            message:"This is protected route for Student only"
        })
      }
      next();
    }catch(error){
        return res.status(500).json({
            sucess:false,
            message:"User role can't match"
        })

    }
}

function isInstructor(req,res,next){
    try{
      if(req.user.acconutType !=="Instructor"){
        return res.status(500).json({
            sucess:false,
            message:"This is protected route for Instructor  only"
        })
      }
      next();
    }catch(error){
        return res.status(500).json({
            sucess:false,
            message:"User role can't match"
        })

    }
}

module.exports ={auth , isStudent , isInstructor}
