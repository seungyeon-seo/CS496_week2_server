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
            var jsonBody = JSON.parse(res.body)
            console.warn(jsonBody)

            if (!err && res.statusCode == 200 && jsonBody.data.user_id) {
                console.warn(jsonBody)
                resolve(jsonBody.data.user_id)
            }
            else if(!err && res.statusCode == 200) {
                reject(jsonBody.data.error)
            }
            else {
                reject(err)
            }
        }) 
    })
}

function fakeVerifyToken(input_token) {
    console.log("(test) verifying token...")
    return new Promise((resolve, reject) => {
        switch (input_token) {
            case 'my_token':
                resolve('userIdExample')
                break

            case 'new_token':
                resolve('newUserIdExample')
                break

            case 'nickname_token':
                resolve('aaa')
                break

            default:
                reject({err: "토큰이 유효하지 않습니다", statusCode: 404})
                break
        }
    })
}


function login(userId) {
    console.log("user id: ", userId)
    // TODO routes에 있는거 리팩토링
}

const AuthAPI = {
    verifyToken,
    login,
    fakeVerifyToken,
}

module.exports = AuthAPI