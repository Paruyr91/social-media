"use strict";
const nodemailer = require("nodemailer");

const URL=process.env.ROOT_URL || 'http://localhost:8080/'

module.exports= async function main(user, token) {

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
  
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <paruyrars@gmail.com>',
    to:user.email,
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: `<h1><a href="${URL}verify-account/${token}">Activate your account...</a></h1>`, // html body
  });
 
}
 
