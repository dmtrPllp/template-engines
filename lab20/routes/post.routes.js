const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.get('/posts', postController.getPosts);

router.get('/post/:id', postController.getPostWithCommentsAndLikes);

router.delete('/post/delete/:id', postController.deletePost);

router.put('/post/update/:id', postController.updatePost);

router.post('/post/create', postController.createPost);

module.exports = router;