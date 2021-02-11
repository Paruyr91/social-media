const DB= require('../models/db_associations')

  class ImageControler{
    constructor(){}
    
    async getIamges(req,res){
      let userid=Number(req.params.userid)    
      let user
      userid?user=await DB.User.findOne({where:{id:userid}}):null
      let arefriends= await user.hasFriends(req.decoded.id)     
      if(arefriends && userid || userid===req.decoded.id){
          await DB.Image.findAndCountAll({
            where:{
              userId:userid
            },
            limit:req.body.offset,
            offset:req.body.limit,
          }).then(items=>{
            res.send(items)
          }).catch(err=>{
            res.status(404).send(err)
          })
      }else  res.status(404).send({error:'dont have permission. not friends'})

    }

    async addIamge(req,res){
          if(req.file){
                  let img= await DB.Image.create({ 
                    imagedata:JSON.stringify(req.file),
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
    }

    async updateProfileimage(req,res){
        let param=Number(req.params.id)
         let imgexist
        param?imgexist=await DB.Image.findOne({
          where:{
            id:param,
            userId: req.decoded.id
          }
        }):null

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
            res.status(201).send()
       }).catch(err=>{
          res.status(404).send({success:false,error:err})
       })
      }else  res.status(404).send({success:false,error:"enter currect image ID"})

    }

  
 }
module.exports= new ImageControler