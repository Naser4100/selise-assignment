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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedResults = void 0;
const paginatedResults = (model) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { page, total, sortType, sortBy } = req.body;
        const startIndex = (page - 1) * total;
        const endIndex = page * total;
        let sortObject = {};
        sortObject[sortBy] = sortType === 'asc' ? 1 : -1;
        const totalDocsCount = yield model.countDocuments({ user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        const results = {};
        if (endIndex < (yield model.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                total: total,
            };
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                total: total,
            };
        }
        try {
            const result = yield model
                .find()
                .limit(total)
                .skip(startIndex)
                .sort(sortObject)
                .exec();
            res.paginatedResults = result;
            res.totalDocument = totalDocsCount;
            next();
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};
exports.paginatedResults = paginatedResults;
