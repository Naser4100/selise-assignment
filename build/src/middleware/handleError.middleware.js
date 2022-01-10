"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).json({ success: false, message });
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
