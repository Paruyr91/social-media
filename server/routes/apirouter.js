const express = require('express')
const RegisterController = require('../controllers/RegisterController')
const router= express.Router()
const checktoken= require('../authservice/checktoken')
const UserController = require('../controllers/UserController')

const ImageController = require('../controllers/ImageController')
const FriendRequestController = require('../controllers/FriendRequestController')





router.use(checktoken)


 
router.post(`/register`, RegisterController.registerUser)
router.post(`/login`, RegisterController.loginUser)
router.post(`/verify-account`, RegisterController.verifyAccount)

router.patch('/user', UserController.updateUser)
router.delete('/user', UserController.deleteUser)

router.get('/image', ImageController.getIamges)
router.post('/image', ImageController.addIamge)
router.patch('/image/:id',  ImageController.updateProfileimage)
router.delete('/image/:id', ImageController.deleteIamge)

router.post('/friend-request/:userid', FriendRequestController.addRequest)

 module.exports=router    