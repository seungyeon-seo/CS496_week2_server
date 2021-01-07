const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true
    },

    desc: {
        type: String,
        unique: false,
        required: true
    },

    id: {
        type: String,
        unique: true,
        required: true
    }
})

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel