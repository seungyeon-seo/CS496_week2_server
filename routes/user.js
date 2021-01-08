// // 유저와 관련된 요청을 처리
// // TODO: Create

// var express = require('express');
// var router = express.Router();
// const db = require("../models/");

// function success(res, payload) {
//   return res.status(200).json(payload);
// }

// // 사용자 등록하기 (Create)
// router.post("/register/:token", async (req, res, next) => {
//   try {
//     // TODO 토큰 검증, 에러 핸들링
//     // 
//     const user = await db.User.create(req.body);
//     return success(res, user);
//   } catch (err) {

//     }
// });

// router.get("/login/:token", async (req, res) => {
//     try {
//         // TODO 토큰 검증, 에러 핸들링
//         // 
//         const userId = 'aaaaa'
//         const user = await db.User.findById(userId);
//         res.json(user)
//       } catch (err) {
    
//         }
    
// })

// module.exports = router;