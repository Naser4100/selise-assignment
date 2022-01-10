"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidations = void 0;
const HttpException_1 = require("../exceptions/HttpException");
// eslint-disable-next-line
const handleValidations = (validate) => {
    return (req, res, next) => {
        const result = validate(req.body);
        const isValid = result.error == null;
        if (isValid) {
            return next();
        }
        const { details } = result.error;
        const message = details.map((e) => e.message);
        const msg = message.join(',');
        throw new HttpException_1.HttpException(400, msg);
    };
};
exports.handleValidations = handleValidations;
