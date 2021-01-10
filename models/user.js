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
        type: String,
    }],

    profilePath: {
        type: String,
    },

    groupId: {
        type: String
    }

})

userSchema.pre('save', function(next) {
    if (!this.nickName) { // 닉네임 필드가 없으면 에러 표시 후 저장 취소
        throw '별명이 없습니다';
    }
    if (!this.posts) { // posts 필드가 없으면 추가
      this.posts = []
    }
    // TODO 디폴트 프로필 사진 설정해주기
    next();
});

userSchema.post('find', function(result) {
    console.log('저장 완료', result);
});

const userModel = mongoose.model("user", userSchema)

module.exports = userModel