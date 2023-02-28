const mongoose = require("mongoose");

const commentSchemma = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchemma)