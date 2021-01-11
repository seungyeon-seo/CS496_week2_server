const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    users: [
        {
            type: String,
        },
    ],
});

groupSchema.pre("save", function (next) {
    if (!this.code) {
        // 입장 코드가 없으면 에러 표시 후 저장 취소
        throw new Error("입장 코드가 없습니다");
    }
    next();
});

const groupModel = mongoose.model("group", groupSchema);

module.exports = groupModel;
