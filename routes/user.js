const AuthAPI = require("../utils/auth");
const env = require('dotenv');
const { User } = require("../models");

// .env 파일에 써둔 민감한 정보들을 불러옴
// process.env.{KEY} 형식으로 불러오면 됨
env.config()

const FAILURE = process.env.CODE_FAILURE
const SUCCESS = process.env.CODE_SUCCESS

module.exports = function(app) {
    app.get('/user/:token', (req, res) => {
        const token = req.params.token
        console.log("token: ", token)
        AuthAPI.verifyToken(token)
        .then(user_id => {
            console.warn(user_id)
            return res.status(200).json({msg: "클라이언트의 토큰이 확인되었습니다", id: user_id})
        })
        .catch(reason => {
            console.log(" 에러 발생 ")
            return res.json(reason)
        })
    })

    app.get('/user/login/:token', (req, res) => {
        const token = req.params.token
        console.log("token: ", token)
        AuthAPI.verifyToken(token)
        // AuthAPI.fakeVerifyToken(token)
        .then(user_id => {
            console.warn(user_id)

            User.findOne({ id: user_id })
            .then(user => {
                if(!user) return res.json({statusCode: 190, err: "해당 유저가 존재하지 않습니다"})
                else return res.json(user)
            })
            .catch(err => {
                return res.json({statusCode: 500, err: "데이터베이스에 접속할 수 없습니다"})
            })
        })
        .catch(reason => {
            console.log(" 에러 발생 ")
            return res.json(reason)
        })
    })

    app.post('/user/register/:token/:nickName', (req, res) => {
        const token = req.params.token

        console.log("token: ", token)
        AuthAPI.verifyToken(token)
        // AuthAPI.fakeVerifyToken(token)
        .then(user_id => {
            console.warn(user_id)

            User.findOne({ id: user_id })
            .then(user => {
                if (user) return res.json({statusCode: 190, err: "해당 유저는 이미 DB에 등록되어 있습니다"})
                else {
                    let user = new User()
                    user.nickName = req.params.nickName
                    user.id = user_id

                    user.save( (err) => {
                      if (err) {
                        console.error(err)
                        return res.json({statusCode: 190, resultCode: FAILURE, error: '유저를 등록할 수 없습니다. 이미 존재하는 닉네임입니다.' })
                      }
                      return res.json({statusCode: 200, resultCode: SUCCESS, msg: '유저를 등록했습니다' })
                    })
                }
            })
            .catch(err => {
                return res.json({statusCode: 500, err: "데이터베이스에 접속할 수 없습니다"})
            })
        })
        .catch(reason => {
            console.log(" 에러 발생 ")
            return res.json(reason)
        })
    })
}