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
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const config_1 = __importDefault(require("config"));
const user_service_1 = require("../services/user.service");
const { Strategy } = passport_jwt_1.default;
const JWT_SECRET = config_1.default.get('jwtSecret');
const cookieExtractor = (req) => {
    var _a;
    let jwt = null;
    if (req && req.cookies) {
        jwt = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    }
    return jwt;
};
const optionsCookie = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET,
};
exports.default = (passport) => {
    passport.use(new Strategy(optionsCookie, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.findUserByIdService)(payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }
        catch (error) {
            console.log(error);
            done(null, false);
        }
    })));
};
