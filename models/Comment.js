const mongoose = require("mongoose");

const commentSchemma = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchemma)