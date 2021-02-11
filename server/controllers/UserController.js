const DB= require('../models/db_associations')


  class UserControler{
    constructor(){}

    async updateUser(req,res){
        let user= await DB.User.findOne({
            where: {id:req.decoded.id}
          })
         if(user, req.body){
            if(req.body.name)user.name=req.body.name
            if(req.body.surname)user.surname=req.body.surname
            if(req.body.bourn_at)user.bourn_at=req.body.bourn_at
            if(user.changed()){      
                  user.save().then(a=>{
                        res.send({success:true})
                  }).catch(err=>{
                        res.status(412).send({success:false,error:err})
                  })
            }else res.status(404).send({success:false, error:'Enter new Data'})
          }else res.status(404).send({success:false, error:'not found'})
    }

    async deleteUser(req,res){
         await DB.User.destroy({
            where: {id:req.decoded.id}
            }).then(a=>{
               res.status(201).send()
         }).catch(err=>{
            res.status(404).send({success:false,error:err})
         })
    }

 }
 
module.exports= new UserControler