const express = require('express')
const app =express()
const bodyParser=require('body-parser')
const server=require('http').Server(app)
require('dotenv').config()
const PORT=process.env.PORT || 80

const router=require('./server/router')

app.use(router)


server.listen(PORT, ()=>{
console.log(`server started at${PORT}`)
}) 