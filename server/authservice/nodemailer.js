"use strict";
const nodemailer = require("nodemailer");

// https://accounts.google.com/b/0/DisplayUnlockCaptcha

module.exports= async function main(user, token,url) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: "paruyrars@gmail.com", 
      pass: "paruyrars!@#", 
    },
  });
  console.log(url)
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <paruyrars@gmail.com>',
    to:user.email,
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: `<h1><a href="http://${url}/verify-account/${token}">Activate your account</a></h1>`, // html body
  });
 
}   
 
   