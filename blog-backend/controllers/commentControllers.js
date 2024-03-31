const express = require('express')
const Comment = require('../models/Comment')
const Post = require('../models/Post')
const { mongoose } = require('mongoose')
const { ObjectId } = mongoose.Types

const createComment = async (req, res, next) => {
    try {
        const { desc, slug, parent, replyOnUser } = req.body

        const post = await Post.findOne({ slug });

        if (!post) {
            const error = new Error("Post not found!")
            next(error);
        }

        const newComment = new Comment({
            user: req.user._id,
            desc,
            post: post._id,
            parent,
            replyOnUser
        })
        const savedComment = await newComment.save();
        return res.status(200).json(savedComment);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const updateComment = async (req, res, next) => {
    
    try {
        const { desc } = req.body;
        const commentId = req.params.commentId;

        console.log(commentId)
        const comment = await Comment.findById(commentId)
        console.log(comment)
        if (!comment) {
            const error = new Error("Comment not found");
            return next(error);
        }
        comment.desc = desc;
        const updatedComment = await comment.save();
        return res.status(200).json(updatedComment);
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    const deleteReplies = async (commentId) =>{
        const replies = await Comment.find({parent:commentId});
        if(replies.length==0) return;
        for(const reply of replies){
            deleteReplies(reply._id)
            await Comment.findByIdAndDelete(reply._id);
        }
    }
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            const error = new Error("Comment not found!")
            return next(error)
        }
        deleteReplies(comment._id);
        return res.status(200).json(comment);
    } catch (error) {
        next(error)
    }

}
module.exports = { createComment, updateComment, deleteComment }