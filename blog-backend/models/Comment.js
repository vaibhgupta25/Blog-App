const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    desc: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    check: {
        type: Boolean,
        default: false,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    replyOnUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

CommentSchema.virtual("replies", {
    ref: "Comment",          //referencing to comment model
    localField: "_id",       //local feild of post
    foreignField: "parent"   //id of post will be used as postId in other schema
})

const Comment = model("Comment", CommentSchema);
module.exports = Comment;