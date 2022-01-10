"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Login validator
const loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const loginValidator = (data) => {
    const result = loginSchema.validate(data);
    result.value = data;
    return result;
};
exports.loginValidator = loginValidator;
