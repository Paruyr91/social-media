const DB= require('../models/db_associations')

  class ComentControler{
    constructor(){}

    async addComent(req,res){
          let user=await DB.User.findOne({where:{id:req.decoded.id}})
          let postId=Number(req.body.postId) 
          let post
          postId?post= await DB.Post.findOne({where:{id:postId}}):null
          let arefriends
          post?arefriends= await user.hasFriends(post.userId):null   
          if(arefriends || post?.userId===req.decoded.id && post){
            DB.Coment.create({
              userId:req.decoded.id,
              text:req.body.text,
              postId:req.body.postId
            }).then(coment=>res.send({success:true})
            ).catch(err=>res.status(412).send({error:err})) 
          }else res.status(404).send({error:'dont have permission. not friends'})
    }

    async updateComent(req,res){
      
      let comentid=Number(req.params.id) 
       
      if(comentid){ 
        await DB.Coment.update(
          {text:req.body.text },
          { where:{
            id:comentid,
            userId:req.decoded.id
            } 
          }).then(coment=>{
            coment[0]?res.send({success:true}):res.status(404).send({error:'dont have permission'})
        }).catch(err=>res.status(412).send({error:err})) 
      }else res.status(404).send({error:'Enter currect Param'})
    }

  async  deleteComent(req,res){
      let comentid=Number(req.params.id) 
      if(comentid){
        await DB.Coment.findOne({
              where: {
                id:comentid,
              },
              include:[{
                model:DB.Post,
                as:'post',
                required:true
              }]
          }).then(coment=>{
            if(coment.userId===req.decoded.id || coment.post.userId===req.decoded.id){
              coment.destroy()
               res.status(201).send()
            }else res.status(404).send({error:'dont have permission'})
          }).catch(err=>{
              res.status(404).send({success:false,error:err})
          })
      }else res.status(404).send({error:'Enter currect Param'})
    }
 
 }
module.exports= new ComentControler