"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const user_validator_1 = require("../validators/user.validator");
const router = express_1.default.Router();
router.post('/registration', (0, validation_middleware_1.handleValidations)(user_validator_1.registrationValidator), user_controller_1.createUser);
router.post('/set-password', (0, validation_middleware_1.handleValidations)(user_validator_1.setPasswordValidator), user_controller_1.setPassword);
exports.default = router;
