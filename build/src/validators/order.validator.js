"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewOrderValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Add new product validator
const productList = joi_1.default.object().keys({
    productId: joi_1.default.string().required(),
    quantity: joi_1.default.string().required(),
    totalPrice: joi_1.default.string().required(),
    size: joi_1.default.string().required(),
});
const addNewOrderSchema = joi_1.default.object().keys({
    productList: joi_1.default.array().items(productList).min(1).required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
});
const addNewOrderValidator = (data) => {
    const result = addNewOrderSchema.validate(data);
    result.value = data;
    return result;
};
exports.addNewOrderValidator = addNewOrderValidator;
