const DB= require('../models/db_associations')
const { Sequelize, Op, Model, DataTypes} = require('sequelize');


  class FriendRequestControler{
    constructor(){
    
    }
    async friendsRequests(req, res){
      
      let fromrequest=await DB.User.findAndCountAll({
        attributes : ['id','name','email'],
        include: [{
          model: DB.Request,
          attributes : [],
          where: { fromId:req.decoded.id } 
        }],
        limit: 1,
        offset:0
      })
      res.send({fromrequest})

    }
    async addRequest(req,res){
        let userid=Number(req.params.userid)
        if(userid && userid!==req.decoded.id){
            await DB.Request.findOrCreate({
              where: {
                [Op.or]: [
                  { fromId: req.decoded.id, toId:userid },
                  { toId: req.decoded.id, fromId:userid}
                ]
              },
              defaults: {
                fromId:req.decoded.id,
                toId:userid
              }
            }).then(([friendreq, created])=>{
              created?res.send({created,friendreq}):
                      res.status(412).send({error:'enter crect Id Request already exist'})
            }).catch(err=>{ 
              res.status(412).send({error:err}) 
            }) 
        }else res.status(412).send({error:'enter crect Id'}) 
    }  

    async addToFriends(req, res){
      let userid=Number(req.params.userid)
      console.log(userid,req.decoded.id)
      if(userid && userid!==req.decoded.id){
          await DB.Request.findOne({
            where: {
                fromId:userid,
                toId:req.decoded.id,
                arefriends:false
            }
          }).then((friend)=>{
            if(friend){
              friend.arefriends=true
              friend.save()
              res.send({friend})
            }else res.status(412).send({error:'enter crect Id Request not Found'})
          }).catch(err=>{ 
            res.status(412).send({error:err}) 
          }) 
      }else res.status(412).send({error:'enter crect Id'}) 
    }
 
   
 }
module.exports= new FriendRequestControler  