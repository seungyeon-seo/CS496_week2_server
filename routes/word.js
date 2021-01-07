const express = require('express')

const fs = require('fs')
const data = {
    words: [
        {
            id: 1,
            word: "apple"
        },
        
        {
            id: 2,
            word: "banana"
        },
        
        {
            id: 3,
            word: "car"
        },
    ]
}

const router = express.Router()

router.get('/', function(req, res) {
    res.send('word route');
  });
  

// TODO post로 바꾸기
router.get('/insert', function (req, res) {
    res.send("아직 구현 안됨")
})
router.get('/update', function (req, res) {
    res.send("아직 구현 안됨")
})
router.get('/delete', function (req, res) {
    res.send("아직 구현 안됨")
})
router.get('/select', function (req, res) {
    res.json(data)
})

router.get('/select/:id', function (req, res) {
    res.json(data.words[req.params.id-1])
})

module.exports = router;
