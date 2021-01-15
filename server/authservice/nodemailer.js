"use strict";
const nodemailer = require("nodemailer");


module.exports= async function main(user, token,url) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: "paruyrars@gmail.com", 
      pass: "paruyrars!@#", 
    },
  });
  
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <paruyrars@gmail.com>',
    to:user.email,
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: `<h1><a href="${url}verify-account/${token}">Activate your account...</a></h1>`, // html body
  });
 
}
 
 