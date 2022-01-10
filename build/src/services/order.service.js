"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientOrderDetailsService = exports.getOrderDetailsService = exports.addNewOrderService = void 0;
const uuid_1 = require("uuid");
const quantity_model_1 = __importDefault(require("../models/quantity.model"));
const client_model_1 = __importDefault(require("../models/client.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
// Add new order
const addNewOrderService = (newOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const { productList, name, email, phone } = newOrder;
    try {
        const client = yield client_model_1.default.create({ name, email, phone });
        const order = yield order_model_1.default.create({
            orderId: (0, uuid_1.v4)(),
            clientId: client._id,
        });
        Promise.all(productList.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            yield orderItem_model_1.default.create({
                productId: product.productId,
                orderId: order._id,
                quantity: parseInt(product.quantity),
                totalPrice: parseInt(product.totalPrice),
                size: product.size,
            });
            yield quantity_model_1.default.findOneAndUpdate({ productId: product.productId }, { $inc: { quantity: -parseInt(product.quantity) } }, { new: true });
        })));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.addNewOrderService = addNewOrderService;
// Get order details
const getOrderDetailsService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield order_model_1.default.findById(orderId).populate('clientId', 'name email phone -_id');
        const orderedItems = yield orderItem_model_1.default.find({ orderId })
            .populate({
            path: 'productId',
            select: '-_id -user -createdAt -updatedAt',
            populate: {
                path: 'quantity',
                select: 'quantity -_id',
            },
        })
            .select('quantity totalPrice size -_id');
        return {
            client: client.clientId,
            orderedItems,
        };
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getOrderDetailsService = getOrderDetailsService;
// Get client details
const getClientOrderDetailsService = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({ clientId });
        const orderIds = orders.map((order) => order._id);
        const orderedItems = yield orderItem_model_1.default.find({
            orderId: { $in: orderIds },
        })
            .populate({
            path: 'productId',
            select: '-_id -user -createdAt -updatedAt',
            populate: {
                path: 'quantity',
                select: 'quantity -_id',
            },
        })
            .select('quantity totalPrice size -_id');
        return orderedItems;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getClientOrderDetailsService = getClientOrderDetailsService;
