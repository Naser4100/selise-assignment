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
exports.generatePDF = exports.getClientsOrderDetails = exports.getOrderDetails = exports.addNewOrder = void 0;
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const pdfGenerator_1 = __importDefault(require("../utils/pdfGenerator"));
const order_service_1 = require("../services/order.service");
const HttpException_1 = require("../exceptions/HttpException");
exports.addNewOrder = (0, asyncHandler_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, order_service_1.addNewOrderService)(req.body);
    res.status(201).json({
        success: true,
        message: 'New order created successfully',
    });
}));
exports.getOrderDetails = (0, asyncHandler_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const OrderDetails = yield (0, order_service_1.getOrderDetailsService)(orderId);
    res.status(200).json({
        success: true,
        message: 'Get order details successfully',
        OrderDetails,
    });
}));
exports.getClientsOrderDetails = (0, asyncHandler_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.clientId;
    if (!clientId) {
        throw new HttpException_1.HttpException(400, 'Client id is required');
    }
    const clientOrderDetails = yield (0, order_service_1.getClientOrderDetailsService)(clientId);
    res.status(200).json({
        success: true,
        message: "Get client's order details successfully",
        clientOrderDetails,
    });
}));
exports.generatePDF = (0, asyncHandler_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.clientId;
    if (!clientId) {
        throw new HttpException_1.HttpException(400, 'Client id is required');
    }
    const clientOrderDetails = yield (0, order_service_1.getClientOrderDetailsService)(clientId);
    (0, pdfGenerator_1.default)(clientId, clientOrderDetails, res);
    // res.status(200).download(path.join(__dirname, `../../pdf/${clientId}.pdf`));
    // res.setHeader('Content-type', 'application/pdf');
    // res.download(path.join(__dirname, `../../pdf/${clientId}.pdf`));
    // res.status(200).json({ success: true });
}));
