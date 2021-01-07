const express = require('express')
const app = express()
const routes = require('./routes')
const wordRouter = require('./routes/word')
const path = require('path')
const router = express.Router()

const port = 80

// 어플리케이션 설정


app.get('/hello', function(req, res) {
    res.json({msg: "hello world"})
})

// app.get('/', function(req, res) {
//     res.render('index', { title: '간단한 ToDo 리스트 예제 실습' });
//   })
app.use('/word', wordRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://192.249.18.224`)
})

