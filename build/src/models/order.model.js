"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    orderId: {
        type: String,
        required: true,
    },
    clientId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'client',
        required: true,
    },
}, { timestamps: true });
const Order = mongoose_1.default.model('order', OrderSchema);
exports.default = Order;