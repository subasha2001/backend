"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = exports.BannerModel = exports.ReviewSchema = exports.BannerSchema = void 0;
var mongoose_1 = require("mongoose");
exports.BannerSchema = new mongoose_1.Schema({
    image: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.ReviewSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    imageDis: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    review: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.BannerModel = (0, mongoose_1.model)('banner', exports.BannerSchema);
exports.ReviewModel = (0, mongoose_1.model)('reviews', exports.ReviewSchema);
