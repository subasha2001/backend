"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoldSilverModel = exports.ProductsModel = exports.GSSchema = exports.ProductSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, minlength: 5 },
    imageDis: { type: String, required: true },
    imageHov: { type: String, required: true },
    description: { type: String },
    metalType: { type: [String], required: true },
    category: { type: [String], required: true },
    weight: { type: Number },
    mc: { type: Number },
    size: { type: Number },
    stock: { type: Number, required: true },
    wastage: { type: Number },
    price: { type: Number }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
exports.GSSchema = new mongoose_1.Schema({
    gold22: { type: Number },
    gold24: { type: Number },
    gold18: { type: Number },
    silver: { type: Number },
    gst: { type: Number }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
exports.ProductsModel = (0, mongoose_1.model)("products", exports.ProductSchema);
exports.GoldSilverModel = (0, mongoose_1.model)("G_S_GST", exports.GSSchema);
