const DB= require('../models/db_associations')


  class UserControler{
    constructor(){
    
    }



    async updateUser(req,res){
       
        let user= await DB.User.findOne({
            where: {id:req.decoded.id}
          })

          if(user){

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

          }else res.status(404).send({error:'not found'})

    }

    async deleteUser(req,res){
         await DB.User.destroy({
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