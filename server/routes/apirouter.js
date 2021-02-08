const express = require('express')
const router= express.Router()
const checktoken= require('../authservice/checktoken')
const parsercloudinary =require('../authservice/parsercloudinary ')
const {getIamges, addIamge, updateProfileimage, deleteIamge } = require('../controllers/ImageController')
const { registerUser, loginUser, verifyAccount } = require('../controllers/RegisterController')
const {getFriends,addRequest,addToFriends, deleteFriends} = require('../controllers/FriendRequestController')
const {updateUser,deleteUser} = require('../controllers/UserController')
const {addPost, udatePost, deletePost}= require('../controllers/PostController')
const {addComent, updateComent, deleteComent}=require('../controllers/ComentController')
const {addlike}=require('../controllers/LikeController')
router.use(checktoken)


router.post(`/register`, registerUser)
router.post(`/login`, loginUser)
router.post(`/verify-account`, verifyAccount)

router.patch('/user', updateUser)
router.delete('/user', deleteUser)

router.get('/friend/:param', getFriends)
router.post('/friend/:id', addRequest)
router.patch('/friend/:id', addToFriends)
router.delete('/friend/:id', deleteFriends)


router.get('/image/:userid', getIamges)
router.post('/image',parsercloudinary.single('image'),  addIamge)
router.patch('/image/:id', updateProfileimage)
router.delete('/image/:id', deleteIamge)

router.post('/post',parsercloudinary.single('image'), addPost)
router.patch('/post/:id',parsercloudinary.single('image'), udatePost)
router.delete('/post/:id', deletePost)

router.post('/coment', addComent)
router.patch('/coment/:id', updateComent)
router.delete('/coment/:id',deleteComent)

 router.post('/like', addlike)




 

module.exports=router     