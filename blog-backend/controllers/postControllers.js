const Post = require('../models/Post')
const Comment = require('../models/Comment')
const uploadPicture = require('../middlewares/uploadPictureMiddleware')
const fileRemover = require('../utils/fileRemover')
const { v4 } = require('uuid');

const createPost = async (req, res, next) => {
    try {
        const post = new Post({
            title: "Sampe Title",
            caption: "Sample Caption",
            body: {
                type: "doc",
                content: [],
            },
            slug: v4(),
            photo: "",
            user: req.user._id,
        })
        const createdPost = await post.save();
        return res.json(createdPost);
    } catch (error) {
        next(error);
    }

}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
        // console.log(post)

        if (!post) {
            const error = new Error("Post not found!")
            next(error);
            return;
        }

        const upload = uploadPicture.single("postPicture")

        const handleUpdatePosts = async (data) => {
            const { title, caption, slug, body, tags, categories } = JSON.parse(data);
            post.title = title || post.title;
            post.caption = caption || post.caption;
            post.slug = slug || post.slug;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.categories = categories || post.categories;
            const updatedPost = await post.save();

            return res.json(updatedPost);
        }

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error(
                    "An unknown error occured when uploading " + err.message
                );
                next(error);
            }
            else {

                let filename;
                filename = post.photo;
                if (filename) fileRemover(filename);

                if (req.file) {
                    post.photo = req.file.filename;
                }
                else {
                    post.photo = "";
                }
                // passing text as form data
                handleUpdatePosts(req.body.Document);
            }
        })

    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findOneAndDelete({ slug: req.params.slug });

        if (!post) {
            const error = new Error("post was not found");
            return next(error);
        }

        await Comment.deleteMany({ post: post._id })
        return res.json({ "message": "post deleted Successfully!" });

    } catch (err) {
        next(err)
    }
}

const getPost = async (req, res, next) => {

    const populateReplies = async (comments) => {
        // console.log(comments)
        const populatedReplies = Promise.all(comments.map(async (comment) => {
            const populatedReplies = await Comment.populate(
                comment,
                {
                    path: 'replies',
                    match: { check: true },
                    populate: [
                        { path: 'replies', match: { check: true } },
                        { path: 'user', select: ['name', 'avatar'] }
                    ]
                })
            // console.log(populatedReplies)
            if (populatedReplies.replies.length > 0) {
                populatedReplies.replies = await populateReplies(populatedReplies.replies)
            }
            return populatedReplies
        }))

        return populatedReplies
    }

    try {
        const post = await Post
            .findOne({ slug: req.params.slug })
            .populate([
                {
                    path: 'user',
                    select: ["name", "avatar"]
                },
                {
                    path: 'comments',   //fetching main comment
                    match: { check: true, parent: null },
                },
            ])
        if (!post) {
            const error = new Error("Post not found!");
            return next(error)
        }

        await populateReplies(post.comments)
        return res.json(post)

    } catch (error) {
        next(error);
    }
}

const getAllPosts = async (req, res, next) => {
    try {
        const filter = req.query.searchKey;
        const where = {};
        if (filter) {
            where.title = {$regex:filter, $options:"i"};
        }

        const query = Post.find(where);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 5;
        console.log(req.query)
        const skip = (page - 1) * pageSize;
        const total = await Post.countDocuments()
        const pages = Math.ceil(total / pageSize);

        if (page > pageSize) {
            throw new Error("PAGE NOT FOUND!")
        }

        const result = await query
            .skip(skip)
            .limit(pageSize)
            .populate([
                { path: "user", select: ["avatar", "name", "verified"] }
            ])
            .sort({ updatedAt: 'desc' })

        res.header({
            'x-filter': filter,
            'x-totalCount': JSON.stringify(total),
            'x-currentPage': JSON.stringify(page),
            'x-pageSize': JSON.stringify(pageSize),
            "x-totalPageCount": JSON.stringify(pages),
        })

        res.json(result)
    } catch (error) {
        next(error)
    }
}
module.exports = { createPost, updatePost, deletePost, getPost, getAllPosts }