const express = require('express')
const RegisterController = require('../controllers/RegisterController')
const router= express.Router()
const checktoken= require('../authservice/checktoken')
const UserController = require('../controllers/UserController')

const ImageController = require('../controllers/ImageController')





router.use(checktoken)


 
router.post(`/register`, RegisterController.registerUser)
router.post(`/login`, RegisterController.loginUser)
router.post(`/verify-account`, RegisterController.verifyAccount)

router.patch('/user', UserController.updateUser)
router.delete('/user', UserController.deleteUser)

router.post('/image', ImageController.addIamge)
router.patch('/image/:id',  ImageController.updateProfileimage)
router.delete('/image/:id', ImageController.deleteIamge)

 module.exports=router    