const express = require('express')
const RegisterController = require('../controllers/RegisterController')
const router= express.Router()
const checktoken= require('../authservice/checktoken')
const UserController = require('../controllers/UserController')

const ImageController = require('../controllers/ImageController')





router.use(checktoken)


 
router.post(`/register`, RegisterController.registerUser)
router.post(`/login`, RegisterController.loginUser)

router.patch('/user', UserController.updateuser)
router.delete('/user', UserController.deleteuser)

router.post('/image', ImageController.addiamge)
router.patch('/image',  ImageController.updateiamge)


 module.exports=router    