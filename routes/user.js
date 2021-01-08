// 유저와 관련된 요청을 처리
// TODO: Create

var express = require('express');
var router = express.Router();
const db = require("../models/");

function success(res, payload) {
  return res.status(200).json(payload);
}

// 사용자 등록하기 (Create)
router.post("/", async (req, res, next) => {
  try {
    const user = await db.Post.create(req.body);
    return success(res, user);
  } catch (err) {
    next({ status: 400, message: `게시글(id: ${id}) 을 수정하지 못했습니다. \n에러 메세지: ${err}` });
  }
});

module.exports = router;