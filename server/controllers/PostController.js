const DB= require('../models/db_associations')

  class PostControler{
    constructor(){}
    
    async addPost(req,res){
       await DB.Post.create({ 
        userId:req.decoded.id,  
        imagedata:JSON.stringify(req.file),
        title:req.body.title,
        text:req.body.text
        }).then(post=>{
            res.send({success:true})
        }).catch(err=>res.status(412).send({error:err}) ) 
    }
    
    async udatePost(req,res){
        let param=Number(req.params.id)
        let post
       param? post= await DB.Post.findOne({
            where: {
                userId:req.decoded.id,
                id:param
            }
          }):null
         if(post){
            if(req.body.title)post.title=req.body.title
            if(req.body.text)post.text=req.body.text
            if(req.file)post.imagedata=JSON.stringify(req.file)
            if(post.changed()){      
                  post.save()
                  .then(a=>res.send({success:true})
                  ).catch(err=>res.status(412).send({success:false,error:err}))
            }else res.status(404).send({success:false, error:'Enter new Data'})
          }else res.status(404).send({error:'enter crect Id, cean`t find post'}) 

    }

    async deletePost(req,res){
        let param=Number(req.params.id)
        if(param){
          await DB.Post.destroy({
            where: {
              id:param,
              userId:req.decoded.id
            }
            }).then(deleted=>{
                deleted?res.status(201).send()
                       :res.status(404).send({success:false,error:"enter currect Post Id"})
         }).catch(err=> res.status(404).send({success:false,error:err}))
        }else  res.status(404).send({success:false,error:"enter currect Post Id"})
    }
  
 }
module.exports= new PostControler