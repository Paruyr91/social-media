const expres = require('express')
const User= require('../models/user')
const bcrypt=require('bcrypt')

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

    res.send(data)

}

async addUser(req,res){

    console.log(req.body,'kkkkkkkkkkkkkkkkkk')
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
   

     

 }
  module.exports= new RegisterControler