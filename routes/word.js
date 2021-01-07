const express = require('express')

const fs = require('fs')
// const data = {
//     words: [
//         {
//             id: 1,
//             word: "apple"
//         },
        
//         {
//             id: 2,
//             word: "banana"
//         },
        
//         {
//             id: 3,
//             word: "car"
//         },
//     ]
// }

const router = express.Router()

router.get('/', function(req, res) {
    res.send('word route');
  });
  

// TnewWord: string, post method로 words.json에 새로운 객체 추가
router.post('/insert/:word', (req, res) => {
    const newWord = req.params.word
    fs.readFile('./words.json', 'utf8', (err, data) => {
        if (err) {            
			fs.writeFile('./words.json', JSON.stringify({words: []}), function (err) {	// words.json 파일 쓰기
				console.log(err)
			});
        }
        else {
            const obj = JSON.parse(data)
            const newWords = [...obj.words, {id: obj.words.length, word: newWord}]
            const newObj = { words: newWords }
            fs.writeFile('./words.json', JSON.stringify(newObj), function (err) {
                res.json(newObj)	// words.json 파일 쓰기
            });
        }
    }
)})

router.get('/update', function (req, res) {
    res.send("아직 구현 안됨")
})

router.get('/delete', function (req, res) {
    res.send("아직 구현 안됨")
})


router.get('/select', (req, res) => {
    fs.readFile('./words.json', 'utf8', (err, data) => {
        if (err) {            
			fs.writeFile('./words.json', JSON.stringify({words: []}), function (err) {	// words.json 파일 쓰기
				res.json({words: []});
			});
        }
        else {
            res.json(JSON.parse(data))
        }
    }
)})

router.get('/select/:id', (req, res) => {
    const selectedId = req.params.id

    fs.readFile('./words.json', 'utf8', (err, data) => {
        if (err) {            
			fs.writeFile('./words.json', JSON.stringify({words: []}), function (err) {	// words.json 파일 쓰기
				res.json({err: "No words.json"});
			});
        }
        else {
            const obj = JSON.parse(data)
            const word = obj.words.find(item => item.id == selectedId)
            if (word) res.json(word)
            else             res.json({err: "No such item"});
        }
    }
)})


module.exports = router;
