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
exports.setPassword = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const user_service_1 = require("../services/user.service");
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const HttpException_1 = require("../exceptions/HttpException");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
exports.createUser = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, user_service_1.createUserService)(req.body);
    const JWT_SECRET = config_1.default.get('jwtSecret');
    const setPasswordTokenExp = config_1.default.get('setPasswordTokenExp');
    const senderFromEmail = config_1.default.get('senderFromEmail');
    const setPasswordToken = jsonwebtoken_1.default.sign({ _id: newUser._id }, JWT_SECRET, {
        expiresIn: setPasswordTokenExp,
    });
    yield (0, sendEmail_1.default)({
        to: newUser.email,
        from: senderFromEmail,
        subject: 'Set password',
        text: `Your token for set a password: \n${setPasswordToken}`,
    });
    res.status(201).json({
        success: true,
        message: 'User created and verification token has been sent to the email',
    });
}));
exports.setPassword = (0, asyncHandler_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const token = req.headers.authorization || '';
    if (!token) {
        throw new HttpException_1.HttpException(400, 'A verification token is required for set password');
    }
    const JWT_SECRET = config_1.default.get('jwtSecret');
    const saltWorkFactor = config_1.default.get('saltWorkFactor');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltWorkFactor);
        yield (0, user_service_1.findUserByIdAndUpdateService)({ _id: decoded._id }, { password: hashedPassword }, {
            new: true,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid or expired token' });
    }
    res.status(200).json({
        success: true,
        message: 'Successfully password set',
    });
}));
