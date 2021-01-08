const express = require("express");
const AuthAPI = require("./utils/auth");
const app = express();
const PORT = 80;
const bodyParser = require("body-parser");
const env = require('dotenv')

// .env 파일에 써둔 민감한 정보들을 불러옴
// process.env.{KEY} 형식으로 불러오면 됨
env.config()

app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get('/auth', (req, res, next) => {
    console.log("auth auth")
    try {
        AuthAPI.verifyToken(process.env.TEST_INPUT_TOKEN)
        .then(user_id => {
            if (user_id) {
                res.status(200).json({msg: "클라이언트의 토큰이 확인되었습니다"})
                console.warn(user_id)
                // res.redirect('/')
                // res.redirect(`/auth/login/${user_id}`)
            }
            else {
                next({status: 190, message: "클라이언트가 잘못된 토큰을 보냈습니다"})
            }
        })
        .catch(err => {
            console.log(" 에러 발생 ")
            console.error(err)
        })
    }
    catch (err) {
        next({ status: 400, message: "토큰을 검증하지 못했습니다" });
    }
})

// app.get('/auth/login/:id', async (req, res, next) => {
//     // AuthAPI.login(req.param.id)
// })


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});