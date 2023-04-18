const { PrismaClient } = require("@prisma/client");
const createPath = require('../helpers/create-path');
const ApiError = require("../error/ApiError");

const db = new PrismaClient();

const userSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    posts: true,
    comments: true,
    friends1: true,
    friends2: true,
}

class UserController {
    async getUsers(req, res) {
        const title = 'Users';

        const users = await db.user.findMany({
            select: userSelect
        });

        res.render(createPath('users'), { users, title })
    }

    async createUser(req, res, next) {
        const { firstName, lastName, email } = req.body;

        const candidate = await db.user.findFirst({
            where: {
                email,
            },
        });

        if (candidate) {
            return next(ApiError.alreadyExist());
        }

        const created = await db.user.create({
            data: {
                firstName,
                lastName,
                email
            },
            select: userSelect,
        });

        res.json(created);
    }

    async updateUser(req, res, next) {
        const { firstName, lastName, email } = req.body;
        const id = +decodeURIComponent(req.params.id);

        const candidate = await db.user.findFirst({
            where: {
                id,
            },
        });

        if (!candidate) {
            return next(ApiError.notFound());
        }

        const updated = await db.user.update({
            where: {
                id,
            },
            data: {
                firstName,
                lastName,
                email
            }
        });

        res.json(updated);
    }

    async deleteUser(req, res, next) {
        const id = +decodeURIComponent(req.params.id);
        console.log(id);
        const candidate = await db.user.findFirst({
            where: {
                id,
            },
        });

        if (!candidate) {
            return next(ApiError.notFound());
        }

        const deleted = await db.user.delete({
            where: {
                id,
            }
        });

        res.json(deleted);
    }
}

module.exports = new UserController();