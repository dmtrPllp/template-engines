class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message = 'bad Request') {
        return new ApiError(400, message);
    }

    static notFound(message = 'not Found') {
        return new ApiError(404, message);
    }

    static alreadyExist(message = 'already exist') {
        return new ApiError(409, message);
    }
}
module.exports = ApiError;