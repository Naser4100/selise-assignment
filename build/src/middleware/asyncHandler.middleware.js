"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch((error) => {
    next(error);
    console.log(error);
});
exports.default = asyncHandler;
