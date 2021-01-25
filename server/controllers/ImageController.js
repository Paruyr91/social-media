const User= require('../models/user')
const uloadfile= require('../authservice/uloadfaile')
const Image= require('../models/image')

const multer = require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./server/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    } 
})  



  class ImageControler{
    constructor(){
    
    }

    async addiamge(req,res){

        const upload = multer({ storage }).single('image')
        upload(req, res,async function(err) {
          if (err) {
              console.log(err)
            return res.send(err)
          }
          let image
          if(req.file){
              try{
                  image= await  uloadfile(req,res)
              }catch(error){
                  res.status(404).send({error:'Clodinary connection not found'})
              }
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
        })

      


          
    }


    async updateiamge(req,res){

    }


 }
module.exports= new ImageControler