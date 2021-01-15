const expres = require('express')
const User= require('../models/user')
const bcrypt=require('bcrypt')
const accesstoken=require('../authservice/token')
const jwt = require( 'jsonwebtoken' );

  class RegisterControler{
    constructor(){
    
    }

async  allUsers(req,res){
    let data
    await User.findAll().then(function(item){
        data=item
           
         }).catch(function (err) {
             console.log(err)
         });

    res.status(401).send(data)

}

async registerUser(req,res){

    const inputValue=req.body
     req.session.inputValue=inputValue

     await User.create({ 
         email:req.body.email,
         password:req.body.password,
         name: req.body.name,
         surname:req.body.surname,
         age:req.body.age,
        
        }).then(function(item){
            res.status(201).send({success:true})
        }).catch(function (err) {
            console.log(err)
           res.status(404).send({success:false,error:err.error})
        });
          
}
   
async loginUser(req,res){
    let user;
    const error =await User.findOne({
       where: {email:req.body.email,}
     }).then(function(us) {
         if(us){
            if(!bcrypt.compareSync(req.body.password,us.dataValues.password)){
                return {password:'enter curect password'}
            }else{
                user={... us.dataValues}
            }
         }else{
             return {email:'enter currect Email'}
         }
     })
    if(error){
       req.session.validationError=error
       res.status(404).send(error)
    }else{
        delete user.password
        delete user.admin

        let token =accesstoken(user)
        let expiertime= Date.now()+7100000

        //res.cookie( 'my-token', token, {httpOnly: true})
        res.status(201).send({
            success:true,
            token:token,
            user:user,
            expiertime:expiertime
        })
    }
}
     

 }
  module.exports= new RegisterControler