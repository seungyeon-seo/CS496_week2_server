const mongoose = require("mongoose");
const { userSchema } = require("./user");

mongoose.model("User", userSchema);

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 유저 object id 저장
});

groupSchema.pre("save", function (next) {
    if (!this.code) {
        // 입장 코드가 없으면 에러 표시 후 저장 취소
        throw new Error("입장 코드가 없습니다");
    }
    next();
});

const groupModel = mongoose.model("group", groupSchema);

module.exports = {groupModel, groupSchema};