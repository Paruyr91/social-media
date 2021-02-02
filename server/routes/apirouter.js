const express = require('express')
const RegisterController = require('../controllers/RegisterController')
const router= express.Router()
const checktoken= require('../authservice/checktoken')
const UserController = require('../controllers/UserController')
const parsercloudinary =require('../authservice/parsercloudinary ')

const ImageController = require('../controllers/ImageController')
const FriendRequestController = require('../controllers/FriendRequestController')

router.use(checktoken)


router.post(`/register`, RegisterController.registerUser)
router.post(`/login`, RegisterController.loginUser)
router.post(`/verify-account`, RegisterController.verifyAccount)

router.patch('/user', UserController.updateUser)
router.delete('/user', UserController.deleteUser)

router.get('/friend/:param', FriendRequestController.getFriends)
router.post('/friend/:id', FriendRequestController.addRequest)
router.patch('/friend/:id', FriendRequestController.addToFriends)
router.delete('/friend/:id', FriendRequestController.deleteFriends)


router.get('/image', ImageController.getIamges)
router.post('/image',parsercloudinary.single('image'),  ImageController.addIamge)
router.patch('/image/:id',  ImageController.updateProfileimage)
router.delete('/image/:id', ImageController.deleteIamge)



 

module.exports=router     