const { PrismaClient } = require("@prisma/client");
const createPath = require('../helpers/create-path');
const ApiError = require("../error/ApiError");
const moment = require('moment');

const db = new PrismaClient();

const commentSelect = {
    id: true,
    user: {
        select: {
            id: true,
        }
    },
    post: {
        select: {
            id: true,
        }
    },
    commentText: true,
    commentDate: true,
}

class CommentController {
    async getComments(req, res) {
        const title = 'Comments';

        const comments = await db.comment.findMany({
            select: commentSelect,
        });

        res.render(createPath('comments'), { comments, moment, title })
    }

    // async getPostWithCommentsAndLikes(req, res) {
    //     const id = +decodeURIComponent(req.params.id);

    //     const post = await db.post.findFirst({
    //         where: {
    //             id,
    //         },
    //         select: {
    //             ...postSelect,
    //             ...fullSelect,
    //         }
    //     });

    //     res.render(createPath('post'), { post, moment, title: 'Post' })
    // }

    async createComment(req, res, next) {
        const { userId, postId, commentText } = req.body;
        console.log(userId);
        console.log(postText);

        const user = await db.user.findFirst({
            where: {
                id: +userId,
            },
        });
        const post = await db.post.findFirst({
            where: {
                id: +postId,
            },
        });

        if (!user || !post) {
            return next(ApiError.notFound());
        }

        const created = await db.comment.create({
            data: {
                userId,
                postId,
                commentText,
                commentDate: new Date().toISOString(),
            },
            select: commentSelect,
        });

        res.json(created);
    }

    async updateComment(req, res, next) {
        const { commentText } = req.body;
        const id = +decodeURIComponent(req.params.id);

        const candidate = await db.comment.findFirst({
            where: {
                id,
            },
        });

        if (!candidate) {
            return next(ApiError.notFound());
        }

        const updated = await db.comment.update({
            where: {
                id,
            },
            data: {
                commentText,
            }
        });

        res.json(updated);
    }

    async deletePost(req, res, next) {
        const id = +decodeURIComponent(req.params.id);
        console.log(id);
        const candidate = await db.comment.findFirst({
            where: {
                id,
            },
        });

        if (!candidate) {
            return next(ApiError.notFound());
        }

        const deleted = await db.comment.delete({
            where: {
                id,
            }
        });

        res.json(deleted);
    }
}

module.exports = new CommentController();