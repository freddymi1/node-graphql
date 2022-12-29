const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('post', postSchema);