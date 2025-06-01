const nodemailer = require("nodemailer");

async function mailSender(email , title ,body){

    try{

        let transporter= nodemailer.createTransport({
            host:"gmail",

            auth:{
              user:"singhas9191@gmail.com",
              pass: "ottm hier bhci zwhu"
            }
        })

        let info = await transporter.sendMail({
          from:"Study Hub By Aditya ",
          to:`${email}`,
          subject:`${title}`,
          html:`${body}`
        })

        console.log(info)

       }

    catch(error){
        console.log("There is some problem while sending an OTP to ths user ", error)
    }

}


module.exports = mailSender;