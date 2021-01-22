const express = require('express')
const RegisterController = require('../controllers/RegisterController')
const router= express.Router()
const checktoken= require('../authservice/checktoken')
const UserController = require('../controllers/UserController')
const multer = require('multer')
// const ImageController = require('../controllers/ImageController')


// let storage=multer.diskStorage({
//     destination:function(req,file,cb){
//       cb(null,'./server/uploads')
//     },
//     filename:function(req,file,cb){
//         cb(null,file.originalname)
//     } 
// })  

// let upload=multer({storage:storage})

// router.use(checktoken)


 
router.post(`/register`, RegisterController.registerUser)
router.post(`/login`, RegisterController.loginUser)

router.patch('/user', UserController.updateuser)
router.delete('/user', UserController.deleteuser)

// router.post('/image', upload.single('image'), ImageController.addiamge)
// router.patch('/image',  ImageController.updateiamge)


 module.exports=router    