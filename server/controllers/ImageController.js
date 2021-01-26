const uloadfile= require('../authservice/uloadfaile')
const DB= require('../models/db_associations')
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
    async getIamges(req,res){
     await DB.Image.findAll({
        where:{
          userId:req.decoded.id
        }
      }).then(items=>{
        res.send(items)
      }).catch(err=>{
        res.status(404).send(err)
      })
    }

    async addIamge(req,res){
        const upload = multer({ storage }).single('image')
        upload(req, res,async function(err) {
          if (err) {
            return res.send(err)
          }
          let image
          if(req.file){
              try{
                  image=await uloadfile(req,res)
              }catch(error){
                  res.status(404).send({error:'Clodinary connection not found'})
              }
             let img= await DB.Image.create({ 
                  imagedata:JSON.stringify(image),
                  userId:req.decoded.id
                  }) 
                  res.send({success:true})
                  if(img){
                    const [pic, created] = await DB.Profilepic.findOrCreate({
                      where: {userId: req.decoded.id}
                       });
                      pic.imageId=img.id
                      pic.save()
                  }
          }else res.status(412).send({success:false,error:'file not found'})
        }) 
    }

    async updateProfileimage(req,res){
        let param=Number(req.params.id)
        let imgexist=await DB.Image.findOne({
          where:{
            id:param,
            userId: req.decoded.id
          }
        })
        if(param && imgexist){
        const [pic, created] = await DB.Profilepic.findOrCreate({
            where: {userId: req.decoded.id}
             });
            pic.imageId=param
            pic.save().then(item=>{
              res.send({success:true})
            }).catch(err=>{ 
              res.status(412).send({error:'enter curect image Id'}) 
            }) 
        } else res.status(404).send({error:'param must be number or body must exteand profilepic'})
    }

    async deleteIamge(req,res){
      let param=Number(req.params.id)
      if(param){
        await DB.Image.destroy({
          where: {
            id:param,
            userId:req.decoded.id
          }
          }).then(a=>{
          res.send({success:true})
       }).catch(err=>{
          res.status(404).send({success:false,error:err})
       })
      }else  res.status(404).send({success:false,error:"enter currect image ID"})

    }

  
 }
module.exports= new ImageControler