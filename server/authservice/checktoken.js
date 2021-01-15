const jwt = require('jsonwebtoken');
const secret =process.env.SECRET_TOKEN_KEY


module.exports=function checktoken(req,res,next){
    if(req.path==='/login' || req.path==='/register' ){
        next()
    }else if (req.headers.authorization) {
                try{
                    let [tokenname, token]=req.headers.authorization.split(' ')
                    if(tokenname!=="Bearer")throw "Token is absent"
                    let decoded = jwt.verify(token, secret ) 
                    req.decoded={... decoded}
                    return next()
                }catch(error){
                    console.log(error.message);
                    if(error.message == "Signature verification failed") resolve(false);
                    return res.status(401).send(error)
                } 
    }else{
        res.status(401).send({
            name: "JsonWebTokenError",
            message: "Token is absent"
        })
    }
}