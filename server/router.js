const express = require('express')
const router= express.Router()
const { Client } = require('pg');


router.get('/', (req, res)=>{

    res.send("<h1>hello</h1>")
})




 module.exports=router   