const express = require('express');
const commentController = require('../controllers/comment.controller');

const router = express.Router();

router.get('/comments', commentController.getComments);

// router.get('/comment/:id', postController.getPostWithCommentsAndLikes);

// router.delete('/post/delete/:id', postController.deletePost);

// router.put('/comment/update/:id', postController.updatePost);

// router.post('/comment/create', postController.createPost);

module.exports = router;