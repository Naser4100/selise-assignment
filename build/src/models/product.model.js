"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
    },
    quantity: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'quantity',
    },
    sizes: [{ type: String }],
    SKU: String,
    productImages: [
        {
            type: String,
        },
    ],
}, { timestamps: true });
const ProductModel = mongoose_1.default.model('product', ProductSchema);
exports.default = ProductModel;
