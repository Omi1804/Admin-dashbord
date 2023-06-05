const express = require('express')
const app = express()
const dotenv = require('dotenv').config() //we dont have to give path to env file as it is in root directory
const PORT = process.env.PORT || 8080
const morgan = require('morgan')
const bodyParser =  require('body-parser')
const path = require('path')
const router = require('./server/routes/router')
const connectDB = require('./server/database/connection')

//log requests
app.use(morgan('tiny')); //-->gives the details of the server

//mongoDB connection 
connectDB()


//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set('view engine','ejs')
app.set('views','views') //-->giving the path to the view folder

//if ejs files are not in views folder then we have to install path moduel and
// app.set('views',path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',router)


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})