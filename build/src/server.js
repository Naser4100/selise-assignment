"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("./app"));
// Import database configuration
const connectDB_1 = __importDefault(require("./utils/connectDB"));
// Application port
const PORT = config_1.default.get('port');
// Starting server
app_1.default.listen(PORT, () => {
    (0, connectDB_1.default)();
    console.log(`Server running on port ${PORT}`);
});
