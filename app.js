const express = require('express')
const app =express()
const bodyParser=require('body-parser')
const server=require('http').Server(app)
require('dotenv').config()
const db= require('./server/models/index')
const PORT=process.env.PORT || 8080
const router=require('./server/router')
const session=require('express-session')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())
app.use(express.json())

app.use(
  session({
      secret:'keybord cat',
      resave:false,
      saveUninitialized:true,
  })
)


app.use(router)



db.sync().then(function() {

 server.listen(PORT, ()=>{
    console.log(`server started at${PORT}`)
}) 

  });


