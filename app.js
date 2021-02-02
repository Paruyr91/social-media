const express = require('express')
const app =express()
const bodyParser=require('body-parser')
const server=require('http').Server(app)
require('dotenv').config()
const db= require('./server/models/index')
const PORT=process.env.PORT || 8080
const apirouter=require('./server/routes/apirouter')
const clientrouter=require('./server/routes/clientrouter')
const session=require('express-session')
const cors=require('cors')
app.use(express.static('server/public'))
app.use(bodyParser.urlencoded({
    extended:false,
     
}))
app.use(cors())
app.use(bodyParser.json())

app.use(express.json());

 
app.use(
  session({
      secret:'keybord cat',
      resave:false,
      saveUninitialized:true,
  })
)



app.use('/api/v1/',apirouter)
app.use( clientrouter)
 

db.sync().then(function() {
  server.listen(PORT, ()=>{
      console.log(`server started at${PORT}`)
     }) 
 });
   
 


