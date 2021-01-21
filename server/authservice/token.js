const jwt = require('jsonwebtoken');
const secret =process.env.SECRET_TOKEN_KEY


module.exports=function generateAccessToken(user){

 let token =jwt.sign({user},secret,{
    expiresIn:'2h'
});
     return    token
}