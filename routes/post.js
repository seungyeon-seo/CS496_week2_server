// 게시글과 관련된 요청을 처리
// TODO: CRUD

var express = require('express');
var router = express.Router();
const db = require("../models/");

function success(res, payload) {
  return res.status(200).json(payload);
}

// 게시글 목록 클라이언트로 보내기 (Read)
router.get("/", async (req, res, next) => {
  try {
    const posts = await db.Post.find({});
    return success(res, posts);
  } catch (err) {
    next({ status: 400, message: "게시글 목록을 받아오지 못했습니다" });
  }
});

// 게시글 하나 클라이언트로 보내기 (Read)
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await db.Post.findById(id); // TODO req.params.id 로 특정 post만 불러오기
        return success(res, post);
    } catch (err) {
      next({ status: 400, message: `게시글(id: ${id}) 을 받아오지 못했습니다. \n에러 메세지: ${err}` });
    }
  });


// 게시글 등록하기 (Create)
router.post("/", async (req, res, next) => {
  try {
    const post = await db.Post.create(req.body);
    return success(res, post);
  } catch (err) {
    next({ status: 400, message: `게시글(id: ${id}) 을 수정하지 못했습니다. \n에러 메세지: ${err}` });
  }
});

// 게시글 수정하기 (Update)
// 클라이언트에서 body 부분에 업데이트 정보를 줘야 함
router.post("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const post = await db.Post.findByIdAndUpdate(id, req.body, {
      new: true // TODO 이게 뭘까
    });
    return success(res, post);
  } catch (err) {
    
    next({ status: 400, message: `게시글(id: ${id}) 을 수정하지 못했습니다.\n에러 메세지: ${err}`});
  }
});

// 게시글 삭제하기 (Delete)
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    await db.Post.findByIdAndRemove(id);
    return success(res,  `게시글(id: ${id}) 을 삭제했습니다.`);
  } catch (err) {
    next({ status: 400, message: `게시글(id: ${id}) 을 받아오지 못했습니다.\n에러 메세지: ${err}`});
  }
});

module.exports = router;