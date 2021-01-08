// env
// require('dotenv').config()

/* dependencies */
const express = require('express')
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const app = express()
const port = 80

// Static File Service
// app.use(express.static('public'))
// // Body-parser
// app.use(bodyParser.urlencoded({ extended: true}))
// app.use(bodyParser.json())
// // Use native promise of Node.js
// mongoose.Promise = global.Promise
// // Connect to MongoDB Server
// mongoose.connect(process.env.MONGO_URI, {}).then(()=>console.log('Successfully connected to mongodb')).catch(e=>console.error(e))

// // configure router 
// var router = require('./routes')(app)


app.get('/test/get', (req, res) => {
    console.log(res)
    res.json({word: '서버통신 성공!'})
})

app.post('/test/contact/insert', (req, res) => {
    console.log(req)
    res.status(200).json({word: "서버통신 성공!"})
    // json 내용 바꾸기
})

app.listen(port, () => {
    console.log(`Example app listening at http://192.249.18.216`)
})

