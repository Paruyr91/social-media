const express = require('express')
const RegisterController = require('../controllers/RegisterController')
const router= express.Router()
const checktoken= require('../authservice/checktoken')
const UserController = require('../controllers/UserController')
const multer = require('multer')

const ImageController = require('../controllers/ImageController')
const FriendRequestController = require('../controllers/FriendRequestController')

let storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./server/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    } 
}) 

let upload=multer({storage:storage})




router.use(checktoken)


 
router.post(`/register`, RegisterController.registerUser)
router.post(`/login`, RegisterController.loginUser)
router.post(`/verify-account`, RegisterController.verifyAccount)

router.patch('/user', UserController.updateUser)
router.delete('/user', UserController.deleteUser)

router.get('/image', ImageController.getIamges)
router.post('/image',upload.single('image'), ImageController.addIamge)
router.patch('/image/:id',  ImageController.updateProfileimage)
router.delete('/image/:id', ImageController.deleteIamge)

router.post('/friend-request/:userid', FriendRequestController.addRequest)

 module.exports=router    