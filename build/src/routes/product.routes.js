"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const product_controller_1 = require("../controllers/product.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const pagination_middleware_1 = require("../middleware/pagination.middleware");
const product_validator_1 = require("../validators/product.validator");
const product_model_1 = __importDefault(require("../models/product.model"));
const router = express_1.default.Router();
router.post('/product', passport_1.default.authenticate('jwt', { session: false }), (0, validation_middleware_1.handleValidations)(product_validator_1.productValidator), product_controller_1.addNewProduct);
router.patch('/product', passport_1.default.authenticate('jwt', { session: false }), (0, validation_middleware_1.handleValidations)(product_validator_1.updateProductValidator), product_controller_1.updateProduct);
router.delete('/product', passport_1.default.authenticate('jwt', { session: false }), product_controller_1.deleteProduct);
router.post('/products', passport_1.default.authenticate('jwt', { session: false }), (0, pagination_middleware_1.paginatedResults)(product_model_1.default), product_controller_1.getAllProduct);
router.post('/products/:productId', passport_1.default.authenticate('jwt', { session: false }), product_controller_1.getProductDetails);
exports.default = router;
