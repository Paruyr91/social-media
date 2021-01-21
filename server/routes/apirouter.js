const express = require('express')
const RegisterController = require('../controllers/RegisterController')
const router= express.Router()
const User = require('../models/user')
const checktoken= require('../authservice/checktoken')
const UserController = require('../controllers/UserController')

router.use(checktoken)

router.get('/', async (req, res)=>{
let data
    await User.findAll().then(function(item){
        data=item
           
         }).catch(function (err) {
             console.log(err)
         });

    res.send(data)
})


router.post(`/register`, RegisterController.registerUser)
router.post(`/login`, RegisterController.loginUser)

router.patch('/user', UserController.updateuser)



 module.exports=router   