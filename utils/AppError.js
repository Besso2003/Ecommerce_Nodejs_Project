// Custome Error Class
// fails: 400-499
// errors: 500-599

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }
}

module.exports = AppError;