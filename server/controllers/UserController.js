const User= require('../models/user')


const multer = require('multer')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './server/uploads')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

  class UserControler{
    constructor(){
    
    }



    async updateuser(req,res){
        let user= await User.findOne({
            where: {id:req.decoded.id}
          })

          if(user){

            console.log(req.body,req.file)

            if(req.body){
               for(let i in req.body){
                     user[i]=req.body[i]
               }
            }

           user.save().then(a=>{
               res.send({success:true})
           }).catch(err=>{
              res.status(412).send({success:false,error:err})
           })

          }else res.status(404).send({error:'not found'})

    }

    async deleteuser(req,res){
         await User.destroy({
            where: {id:req.decoded.id}
            }).then(a=>{
               console.log(a)
            res.send({success:true})
         }).catch(err=>{
            res.status(404).send({success:false,error:err})
         })
    }

 }
module.exports= new UserControler