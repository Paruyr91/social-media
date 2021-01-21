const User= require('../models/user')
  class UserControler{
    constructor(){
    
    }

    async updateuser(req,res){
         await User.findOne({
            where: {id:req.decoded.id}
          }).then(user=>{
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
          }).catch(err=>{
              res.status(404).send({error:'not found'})
          })
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