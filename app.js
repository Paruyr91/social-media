const express = require('express')
const app =express()
const bodyParser=require('body-parser')
const server=require('http').Server(app)
require('dotenv').config()
const path=require('path')

const db= require('./server/models/index')
const PORT=process.env.PORT || 8080

const router=require('./server/router')




app.use(router)



db.sync().then(function() {

 server.listen(PORT, ()=>{
console.log(`server started at${PORT}`)
}) 

  });


