"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const order_controller_1 = require("../controllers/order.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const order_validator_1 = require("../validators/order.validator");
const router = express_1.default.Router();
router.post('/order', passport_1.default.authenticate('jwt', { session: false }), (0, validation_middleware_1.handleValidations)(order_validator_1.addNewOrderValidator), order_controller_1.addNewOrder);
router.post('/orders/:orderId', passport_1.default.authenticate('jwt', { session: false }), order_controller_1.getOrderDetails);
router.post('/orders/clients/:clientId/download', passport_1.default.authenticate('jwt', { session: false }), order_controller_1.generatePDF);
exports.default = router;
