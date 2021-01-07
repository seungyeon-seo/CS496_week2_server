const express = require('express')
const app = express()
const port = 80

app.get('/word/get', (req, res) => {
    console.log(res)
    res.json({ word: 'ㅁㅇㄻㄴㄹㅇ라ㅓ모'})
})

app.listen(port, () => {
    console.log(`Example app listening at http://192.249.18.224`)
})

