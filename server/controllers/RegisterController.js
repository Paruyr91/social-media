const User= require('../models/user')
const bcrypt=require('bcrypt')
const accesstoken=require('../authservice/token')
const sendmail=require('../authservice/nodemailer')
const jwt = require('jsonwebtoken');
const secret =process.env.SECRET_TOKEN_KEY

const Image= require('../models/image')
const { Sequelize, Op, Model, DataTypes} = require('sequelize');
const e = require('express');


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

        let user
        let success=false
        let error


        await User.create({ 
            email:req.body.email,
            password:req.body.password,
            name: req.body.name,
            surname:req.body.surname,
            }).then(function(item){
                success=true
                user=item.dataValues
            }).catch(function (err) {
                error={... err}
            });

        if(success){
            delete user.password
            delete user.activated
            let token =accesstoken(user) 
            sendmail(user,token,req.headers.host).catch(console.error);

            res.status(201).send({success,})
    
        
        }else{
            res.status(412).send({success:false,error:error})
        }
            
    }
   
    async loginUser(req,res){
        let user;
        const error =await User.findOne({

        where: {email:req.body.email},
       
        }).then(function(us) {
            if(us){
                if(!bcrypt.compareSync(req.body.password,us.dataValues.password)){
                    return {password:'enter curect password'}
                }else if(!us.activated){
                    return {activated:'Activate your Acaunt from your email'}
                }else{
                    user={... us.dataValues}
                }
            }else{
                return {email:'enter currect Email'}
            }
        })

        if(error){
        res.status(404).send(error)
        }else{
            delete user.password
            delete user.activated
            let token =accesstoken({
                                    id:user.id,
                                    email:user.email,
                                    name:user.name,
                                    surname:user.surname,
                                })
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

    async verifyAccount(req,res){
        let error={
            success:true
        }
        if(req.body.token){
            try{
                let decoded = jwt.verify(req.body.token, secret )
                await User.findAll({
                        where: {
                            email:decoded.user.email,
                            activated:false
                        }
                    }).then((item)=>{
                        item.map(e=>{ 
                            if(e.id===decoded.user.id){
                                e.activated=true
                                e.save()
                            }else{
                                e.destroy()
                            }
                        })
                        if(e.length===0){
                            error.message='accaunt already activated'
                            error.success=false
                        }
                    }).catch(function (err) {
                        error=err
                        error.success=false
                    });
            }catch(err){
                if(err.message === "Signature verification failed") resolve(false);
                error=err
                error.success=false
            } 
        }else {
            error.message='token absent'
            error.success=false
        }

        if(!error.success){
            res.status(412).send({error:error})
        }else res.send({success:true})

    }

}
  module.exports= new RegisterControler