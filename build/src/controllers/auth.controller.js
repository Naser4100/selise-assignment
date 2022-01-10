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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const asyncHandler_middleware_1 = __importDefault(require("../middleware/asyncHandler.middleware"));
const user_service_1 = require("../services/user.service");
const HttpException_1 = require("../exceptions/HttpException");
const auth_service_1 = require("../services/auth.service");
exports.login = (0, asyncHandler_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.findUserByEmailService)(email);
    if (!user) {
        throw new HttpException_1.NotFound(404, 'User does not exist');
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new HttpException_1.HttpException(400, 'Invalid credentials');
    }
    const accessToken = yield (0, auth_service_1.signAccessTokenService)(user._id);
    const refreshToken = yield (0, auth_service_1.signRefreshTokenService)(user._id);
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res
        .status(200)
        .json({ success: true, message: 'Access and Refresh token has been sent' });
}));
