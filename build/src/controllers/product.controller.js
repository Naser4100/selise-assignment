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
exports.getAllProduct = exports.deleteProduct = exports.updateProduct = exports.getProductDetails = exports.addNewProduct = void 0;
const product_service_1 = require("../services/product.service");
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const HttpException_1 = require("../exceptions/HttpException");
exports.addNewProduct = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, price, details, sizes, productImages, quantity } = req.body;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const newProduct = yield (0, product_service_1.addNewProductService)({
        name,
        user: userId,
        price,
        details,
        sizes,
        productImages,
        quantity,
    });
    res.status(201).json({
        success: true,
        message: 'New product added successfully',
        newProduct,
    });
}));
exports.getProductDetails = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const productId = req.params.productId;
    if (!productId) {
        throw new HttpException_1.HttpException(400, 'Product id is required');
    }
    const product = yield (0, product_service_1.getProductDetailsService)({
        _id: productId,
        user: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
    });
    res.status(200).json({
        success: true,
        message: 'Get product details',
        product,
    });
}));
exports.updateProduct = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, updatedInfo } = req.body;
    const newProduct = yield (0, product_service_1.updateProductService)({ _id: productId }, updatedInfo, { new: true });
    res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        newProduct,
    });
}));
exports.deleteProduct = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { productId } = req.body;
    const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id;
    const deletedProduct = yield (0, product_service_1.deleteProductService)({
        _id: productId,
        user: userId,
    });
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        deletedProduct,
    });
}));
exports.getAllProduct = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: 'Got paginated result',
        totalDocument: res.totalDocument,
        products: res.paginatedResults,
    });
}));
