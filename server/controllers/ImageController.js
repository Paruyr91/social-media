const User= require('../models/user')
const uloadfile= require('../authservice/uloadfaile')
const Image= require('../models/image')

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

  class ImageControler{
    constructor(){
    
    }

    async addiamge(req,res){
        let image
        
        if(req.file){
            try{
                image= await  uloadfile(req,res)
                
            }catch(error){
                res.status(404).send({error:'Clodinary connection not found'})
            }

            console.log(req.decoded.id)

            await Image.create({ 
                imagedata:JSON.stringify(image),
                profilepic:req.body?.profilepic,
                userId:req.decoded.id
    
                }).then(function(item){
                    res.send({success:true})
                }).catch(function (err) {
                    res.status(412).send({success:false,error:err})
                });

                
        }else res.status(412).send({success:false,error:'file not found'})
          
    }


 }
module.exports= new ImageControler