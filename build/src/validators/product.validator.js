"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidator = exports.productValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Add new product validator
const productSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    details: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
    sizes: joi_1.default.array().items(joi_1.default.string()),
    productImages: joi_1.default.array().items(joi_1.default.string()),
});
const productValidator = (data) => {
    const result = productSchema.validate(data);
    result.value = data;
    return result;
};
exports.productValidator = productValidator;
// Update product validator
const updateProductSchema = joi_1.default.object().keys({
    productId: joi_1.default.string().required(),
    updatedInfo: joi_1.default.object().required(),
});
const updateProductValidator = (data) => {
    const result = updateProductSchema.validate(data);
    result.value = data;
    return result;
};
exports.updateProductValidator = updateProductValidator;
