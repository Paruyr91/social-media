const expres = require('express')
const User= require('../models/user')
const bcrypt=require('bcrypt')
const accesstoken=require('../authservice/token')
const jwt = require( 'jsonwebtoken' );
const sendmail=require('../authservice/nodemailer')

const URL=process.env.ROOT_URL || 'http://localhost:8080/'


  class UserControler{
    constructor(){
    
    }

    async updateuser(req,res){
         await User.findOne({
            where: {id:req.decoded.id}
          }).then(user=>{
                if(req.body){
                   for(let i in req.body){
                         user[i]=req.body[i]
                      console.log(i)
                   }
                }
               user.save().then(a=>{
                   res.send({success:true})
               }).catch(err=>{
                  res.status(412).send({success:false,error:err})
               })
          }).catch(err=>{
              res.status(404).send({error:'not found'})
          })
    }


     

 }
  module.exports= new UserControler