const Post = require('../models/Post')
const router = require('express').Router()
const { authGuard, authAdmin } = require('../middlewares/authMiddleware')
const { createPost, updatePost, deletePost, getPost, getAllPosts } = require('../controllers/postControllers')

router
    .route('/')
    .get(getAllPosts)
    .post(authGuard, authAdmin, createPost)

router
    .route('/:slug')
    .put(authGuard, authAdmin, updatePost)
    .delete(authGuard, authAdmin, deletePost)
    .get(getPost)


module.exports = router;
