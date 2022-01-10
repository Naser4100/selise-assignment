"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPasswordValidator = exports.registrationValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Registration validator
const registrationSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    occupation: joi_1.default.string().required(),
});
const registrationValidator = (data) => {
    const result = registrationSchema.validate(data);
    result.value = data;
    return result;
};
exports.registrationValidator = registrationValidator;
// Set password validator
const setPasswordSchema = joi_1.default.object().keys({
    password: joi_1.default.string().required(),
});
const setPasswordValidator = (data) => {
    const result = setPasswordSchema.validate(data);
    result.value = data;
    return result;
};
exports.setPasswordValidator = setPasswordValidator;
