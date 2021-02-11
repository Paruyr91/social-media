
const DB= require('../models/db_associations')

  class LikeControler{
    constructor(){}
    
    async addlike(req,res){
        let postId=Number(req.body.postId) 
        let imageId=Number(req.body.imageId) 
        let where
        if(postId && !imageId){
            where={ postId:postId, userId:req.decoded.id  }
        }else if(!postId && imageId){
            where={ imageId:imageId, userId:req.decoded.id }
        }
        if(where){
             await DB.Like.findOrCreate({
                where:where,
                defaults: {liketype: req.body.type }
              }).then(([like, created])=>{
                    if (!created && like.liketype=== req.body.type) {
                        like.destroy()
                        res.send({msg:'like deleted'})
                        console.log(like)
                    }else if(!created ){
                        like.liketype=req.body.type
                        like.save().then(val=>res.send({msg:'type changed'})
                        ).catch(err=>res.status(412).send({error:err})) 
                    }else  res.send({msg:'like created'})
              }).catch(err=>res.status(412).send({error:err})) 
        }else res.status(404).send({error:'enter only one currect post Id or image Id '})
    }
  
 }
module.exports= new LikeControler