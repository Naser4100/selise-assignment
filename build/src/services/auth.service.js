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
exports.signRefreshTokenService = exports.signAccessTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const signAccessTokenService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const JWT_SECRET = config_1.default.get('jwtSecret');
    try {
        const token = jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, {
            expiresIn: config_1.default.get('accessTokenTTL'),
        });
        return token;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.signAccessTokenService = signAccessTokenService;
const signRefreshTokenService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const JWT_SECRET = config_1.default.get('jwtSecret');
    try {
        const token = jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, {
            expiresIn: config_1.default.get('refreshTokenTTL'),
        });
        return token;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.signRefreshTokenService = signRefreshTokenService;
