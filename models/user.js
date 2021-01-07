const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
        unique: true,
        required: true
    },

    accessTocken: {
        type: String,
        unique: true,
        required: true
    },

    id: {
        type: String,
        unique: true,
        required: true
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel