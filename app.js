// env
require('dotenv').config()

/* dependencies */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 80

// Static File Service
app.use(express.static('public'))

// Body-parser
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

// Use native promise of Node.js
mongoose.Promise = global.Promise

// Connect to MongoDB Server
mongoose.connect("mongodb://localhost:27017/testdb", {}).then(()=>console.log('Successfully connected to mongodb')).catch(e=>console.error(e))

// DEFINE MODEL
// var Contact = require('./models/contacts');

// configure router 
var contactRouter = require('./routes/contact')(app)

app.listen(port, () => {
    console.log(`Example app listening at http://192.249.18.216`)
})