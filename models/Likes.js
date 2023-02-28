const mongoose = require("mongoose")

const likesSchemma = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    isLike: {
        type: Boolean,
        require: false
    }
})