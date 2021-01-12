const mongoose = require("mongoose");
const { contactSchema } = require("./contact");

mongoose.model("Contact", contactSchema)

const userSchema = new mongoose.Schema({
    nickName: {
        // 이름
        type: String,
        required: true,
    },

    id: {
        // 페이스북 id (예시: 1045622939261051)
        type: String,
        unique: true,
        required: true,
    },

    phone: {
        type: String,
    },

    status: {
        type: String,
    },

    profilePath: {
        type: String,
    },

    // group oid로 바꿔야 하나?
    groupCode: {
        type: String,
    },

    contacts: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Contact' }],

    latitude: {
        // 위도
        type: String,
    },

    longitude: {
        // 경도
        type: String,
    },
});


userSchema.post('find', function(result) {
    console.log('저장 완료', result);
});

const userModel = mongoose.model("user", userSchema)

module.exports = { userModel, userSchema }