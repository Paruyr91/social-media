const DB= require('../models/db_associations')

  class FriendRequestControler{
    constructor(){}
    
    async getFriends(req, res){
      let offset=Number(req.body.offset)
      let limit=Number(req.body.limit)
      let param=req.params.param
   
      if(param==="ToId" || param==="FromId" || param==="Friends"){
         let user= await DB.User.findAndCountAll({
            where:{
             id:req.decoded.id
            },
            include: [{
              required:false,
              model:DB.User, 
              as:param
            }]
          }).catch(err=>{ 
            res.status(404).send({error:err}) 
          }) 
          let me=user.rows[0]
          const friends= await me[`get${param}`]({ 
            limit:limit?limit:5,
            offset:offset?offset:0,
            attributes : ['id','name','email','surname','bourn_at'],
            include: [{
              model: DB.Profilepic,
              as: 'profilepic',
              attributes : ['imageId'],
              include:[{
                  model:DB.Image,
                  as:'image',
                  attributes : ['imagedata'],
               }]
           }]
            });
           res.send({count:user.count,friends:friends})
      }else  res.status(404).send({error:'enter curect param'}) 
    }

    async addRequest(req,res){
        let friendid=Number(req.params.id)
        if(friendid && friendid!==req.decoded.id){
         await DB.User.findOne({
            where:{ id:req.decoded.id},
            include:[{
              required:false,
              model:DB.User,
              as:'ToId',
              where:{id:friendid}
            },{
              required:false,
              model:DB.User,
              as:'FromId',
              where:{id:friendid }
            },{
              required:false,
              model:DB.User,
              as:'Friends',
              where:{id:friendid}
            }]
          }).then(me=>{
              if(!me.ToId.length && !me.FromId.length && !me.Friends.length){
                  me.addToId(friendid).then(us=>{
                    res.send({success:true})
                  }).catch(err=>res.status(404).send({error:err}))  
              }else res.status(412).send({error:'enter crect Id request already exist or are friends'}) 
          }).catch(err=>res.status(404).send({error:err}))
        }else res.status(412).send({error:'enter crect Id, You cean`t sent request to yourself'}) 
    }  

    async addToFriends(req, res){
      let friendid=Number(req.params.id)
      if(friendid && friendid!==req.decoded.id){
        await DB.User.findOne({
          where:{ id:req.decoded.id},
          include:[{
            required:false,
            model:DB.User,
            as:'ToId',
            where:{id:friendid}
          },{
            required:false,
            model:DB.User,
            as:'FromId',
            where:{id:friendid }
          },{
            required:false,
            model:DB.User,
            as:'Friends',
            where:{id:friendid}
          }]
        }).then(async me=>{
          let friend=await DB.User.findOne({where:{id:friendid}})
            if(!me.ToId.length && me.FromId.length && !me.Friends.length && friend){
                me.addFriends(friendid)
                friend.addFriends(me.id)
                me.removeFromId(friendid) 
                res.send({success:true})
            }else res.status(412).send({error:'enter crect Id request dont exist or are friends'}) 
        }).catch(err=>res.status(404).send({error:err})) 
      }else res.status(412).send({error:'enter crect Id'}) 
    }

    async deleteFriends(req,res){
      let friendid=Number(req.params.id)
      if(friendid && friendid!==req.decoded.id){
        await DB.User.findOne({
          where:{ id:req.decoded.id},
          include:[{
            required:false,
            model:DB.User,
            as:'Friends',
            where:{id:friendid}
          }]
        }).then(async me=>{
          let friend=await DB.User.findOne({where:{id:friendid}})
            if(me.Friends.length && friend){
                 me.removeFriends(friendid)
                friend.removeFriends(me.id) 
                res.status(201).send()
            }else res.status(412).send({error:'enter crect Id you are not friends'}) 
        }).catch(err=>res.status(404).send({error:err})) 
      }else res.status(412).send({error:'enter crect Id'}) 
    }
 
   
 }
module.exports= new FriendRequestControler  