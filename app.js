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
mongoose.connect(process.env.MONGO_URI, {}).then(()=>console.log('Successfully connected to mongodb')).catch(e=>console.error(e))

// DEFINE MODEL
var Contact = require('./models/contacts');

// configure router 
// var router = require('./routes')(app)


app.get('/test/get', (req, res) => {
    console.log(res)
    res.json({word: '서버통신 성공!'})
})

app.post('/test/contact/insert', (req, res) => {
    // Init contact variable
    var contact = new Contact()
    contact.fullName = req.body.fullName
    contact.phone = req.body.phone
    contact.lookup = req.body.lookup
    contact.personId = req.body.personId
    contact.image = req.body.image

    // Save content and Send response to client
    contact.save(function(err){
        if(err) {
            console.error(err)
            res.status(500).json({result: 0})
            return
        }
        res.status(201).json({result: 1})
    })
    // json 내용 바꾸기
})

app.listen(port, () => {
    console.log(`Example app listening at http://192.249.18.216`)
})

