const User= require('../models/user')
const uloadfile= require('../authservice/uloadfaile')

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


      // console.log(req.body,'lll')
      // console.log(req.file)

            // if(req.file){
            //    try{
            //       let file= await  uloadfile(req,res)
                   
            //    }catch(error){
            //       res.status(404).send({error:'Clodinary connection not found'})
            //    }
             
            // console.log(file,'ggggggggggggggggggggggggggg')

            // }
            
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