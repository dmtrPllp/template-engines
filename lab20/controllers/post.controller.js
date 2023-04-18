const { PrismaClient } = require("@prisma/client");
const createPath = require('../helpers/create-path');
const ApiError = require("../error/ApiError");
const moment = require('moment');

const db = new PrismaClient();

const postSelect = {
    id: true,
    user: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
        }
    },
    postText: true,
    postDate: true,
}

const fullSelect = {
    comments: {
        select: {
            id: true,
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            },
            commentDate: true,
            commentText: true,
        }
    },
    likes: {
        select: {
            id: true,
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            },
            likeDate: true,
        }
    },
}

class PostController {
    async getPosts(req, res) {
        const title = 'Posts';

        const posts = await db.post.findMany({
            select: postSelect,
        });

        res.render(createPath('posts'), { posts, moment, title })
    }

    async getPostWithCommentsAndLikes(req, res) {
        const id = +decodeURIComponent(req.params.id);

        const post = await db.post.findFirst({
            where: {
                id,
            },
            select: {
                ...postSelect,
                ...fullSelect,
            }
        });

        res.render(createPath('post'), { post, moment, title: 'Post' })
    }

    async createPost(req, res, next) {
        const { userId, postText } = req.body;
        console.log(userId);
        console.log(postText);

        const candidate = await db.user.findFirst({
            where: {
                id: +userId,
            },
        });

        if (!candidate) {
            return next(ApiError.notFound());
        }

        const created = await db.post.create({
            data: {
                postText,
                userId: +userId,
                postDate: new Date().toISOString(),
            },
            select: postSelect,
        });

        res.json(created);
    }

    async updatePost(req, res, next) {
        const { postText } = req.body;
        const id = +decodeURIComponent(req.params.id);

        console.log(id);
        console.log(postText);

        const candidate = await db.post.findFirst({
            where: {
                id,
            },
        });

        if (!candidate) {
            return next(ApiError.notFound());
        }

        const updated = await db.post.update({
            where: {
                id,
            },
            data: {
                postText,
                postDate: new Date().toISOString(),
            }
        });

        res.json(updated);
    }

    async deletePost(req, res, next) {
        const id = +decodeURIComponent(req.params.id);
        console.log(id);
        const candidate = await db.post.findFirst({
            where: {
                id,
            },
        });

        if (!candidate) {
            return next(ApiError.notFound());
        }

        const deleted = await db.post.delete({
            where: {
                id,
            }
        });

        res.json(deleted);
    }
}

module.exports = new PostController();