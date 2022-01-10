"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = require("./controllers/user.controller");
const routes = (app) => {
    app.get('/health', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
        res
            .status(200)
            .json({ success: true, message: 'Server is up and running' });
    });
    app.post('/api/users', user_controller_1.createUser);
};
exports.default = routes;
