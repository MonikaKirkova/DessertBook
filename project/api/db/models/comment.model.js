const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    recipeName: {
        type:String
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment }