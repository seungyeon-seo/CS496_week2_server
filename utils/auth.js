const request = require('request');
const env = require('dotenv')

// .env 파일에 써둔 민감한 정보들을 불러옴
// process.env.{KEY} 형식으로 불러오면 됨
env.config()

// require('../.env')
// 사용자 로그인 - 정보 페이스북 서버에 보내서 verify
// ID와 AccessToken (input_token) 을 받아서 페이스북 서버에 전달
// 페이스북 서버가 반환한 user_id와 같은지 체크

// 요청을 보낼 페이스북 서버 주소
const verifyUri = "https://graph.facebook.com/debug_token" 

const getRequestOptions = (input_token) => {
    // if (`${process.env.APP_ID}|${process.env.APP_TOKEN}` == APP_TOKEN)
    //     console.log("앱 토큰 확인 완료!")
    // else {
    //     console.log("잘못된 앱 토큰입니다")
    //     console.log(`${process.env.APP_ID}|${process.env.APP_TOKEN}`)
    // }
    return {
        uri: verifyUri, // 요청을 보낼 페이스북 주소
        qs: {
            access_token: `${process.env.APP_ID}|${process.env.APP_TOKEN}`,
            input_token,
        }
    }
}

function verifyToken(input_token) {        
    console.log("verifying token...")
    return new Promise((resolve, reject) => {
        request.get(getRequestOptions(input_token), (err, res, body) => {
            if (!err && res.statusCode == 200) {
                var jsonBody = JSON.parse(res.body)
                console.warn(jsonBody)
                resolve(jsonBody.data.user_id)
            }
            else {
                console.error(err)
                reject(err)
            }
        }) 
    })
}

function login(userId) {
    console.log("user id: ", userId)
    // TODO DB에서 userId 조회하기

    // 없으면 새로운 유저 생성

    // 있으면 유저 정보
}

const AuthAPI = {
    verifyToken,
    login
}

module.exports = AuthAPI