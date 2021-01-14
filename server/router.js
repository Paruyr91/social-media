const express = require('express')
const router= express.Router()
const User = require('./models/user')


router.get('/', async (req, res)=>{
let data
    await User.create({ 
        email:'aa@aa.aa',
        password:'kkkkkkkk',
        name: 'kkkkk',
        surname:'kkkkkkkkkk',
        age:50,
       
       }).then(function(item){
        data=item
           
         }).catch(function (err) {
             console.log(err)
         });

    res.send(data)
})




 module.exports=router   