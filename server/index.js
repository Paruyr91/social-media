const express = require('express')
const app =express()
const bodyParser=require('body-parser')
const server=require('http').Server(app)
const PORT=process.env.PORT


server.listen(PORT)