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
exports.findUserByIdAndUpdateService = exports.findUserByEmailService = exports.findUserByIdService = exports.createUserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUserService = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.create(newUser);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createUserService = createUserService;
const findUserByIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findById(userId);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findUserByIdService = findUserByIdService;
const findUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findOne({ email });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findUserByEmailService = findUserByEmailService;
const findUserByIdAndUpdateService = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findOneAndUpdate(query, update, options);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findUserByIdAndUpdateService = findUserByIdAndUpdateService;
