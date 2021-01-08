const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
        unique: true,
        required: true
    },

    id: { // 페이스북 id (예시: 1045622939261651)
        type: String,
        unique: true,
        required: true
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
    }]

})

userSchema.pre('save', function(next) {
    if (!this.nickName) { // 닉네임 필드가 없으면 에러 표시 후 저장 취소
        throw '별명이 없습니다';
    }
    if (!this.posts) { // posts 필드가 없으면 추가
      this.posts = []
    }
    next();
});

userSchema.post('find', function(result) {
    console.log('저장 완료', result);
});

const userModel = mongoose.model("user", userSchema)

module.exports = userModel