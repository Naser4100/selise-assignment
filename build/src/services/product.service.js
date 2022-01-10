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
exports.deleteProductService = exports.updateProductService = exports.addNewProductService = exports.getProductDetailsService = exports.gelAllProductService = void 0;
const uuid_1 = require("uuid");
const product_model_1 = __importDefault(require("../models/product.model"));
const quantity_model_1 = __importDefault(require("../models/quantity.model"));
// Get all product
const gelAllProductService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find(query);
        return products;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.gelAllProductService = gelAllProductService;
// Get product details
const getProductDetailsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findOne(query);
        return product;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getProductDetailsService = getProductDetailsService;
const addNewProductService = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, details, price, productImages, sizes, user } = newProduct;
    try {
        const product = yield product_model_1.default.create({
            name,
            user,
            details,
            price,
            productImages,
            sizes,
            SKU: (0, uuid_1.v4)(),
        });
        const quantity = yield quantity_model_1.default.create({
            productId: product._id,
            quantity: newProduct.quantity,
        });
        const updatedWithQuantity = yield product_model_1.default.findByIdAndUpdate(product._id, { quantity: quantity._id }, { new: true });
        return updatedWithQuantity;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.addNewProductService = addNewProductService;
// Update Product
const updateProductService = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (update.quantity) {
            yield quantity_model_1.default.findOneAndUpdate({ productId: query._id }, { quantity: update.quantity }, { new: true });
        }
        delete update.quantity; // Remove quantity key, because our quantity reside in another collection and we already updated that
        return yield product_model_1.default.findOneAndUpdate(query, update, options);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateProductService = updateProductService;
// delete Product
const deleteProductService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_model_1.default.deleteOne(query);
        yield quantity_model_1.default.deleteOne({ productId: query._id });
        return deletedProduct;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteProductService = deleteProductService;
