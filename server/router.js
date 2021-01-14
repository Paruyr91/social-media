const express = require('express')
const RegisterController = require('./controllers/RegisterController')
const router= express.Router()
const User = require('./models/user')
const apiurl='/v1/api/'


router.get('/', async (req, res)=>{
let data
    await User.findAll().then(function(item){
        data=item
           
         }).catch(function (err) {
             console.log(err)
         });

    res.send(data)
})

router.get(`${apiurl}user`, RegisterController.allUsers)
router.post(`${apiurl}user`, RegisterController.addUser)



 module.exports=router   