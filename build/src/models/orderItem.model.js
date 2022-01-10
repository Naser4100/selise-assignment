"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderItemSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    orderId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'order',
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const OrderItemModel = mongoose_1.default.model('order_item', OrderItemSchema);
exports.default = OrderItemModel;
