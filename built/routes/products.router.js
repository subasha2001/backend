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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var products_model_1 = require("../models/products.model");
var data_1 = require("../data");
var multer_1 = __importDefault(require("multer"));
var router = (0, express_1.Router)();
router.get("/seed", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products_model_1.ProductsModel.countDocuments()];
            case 1:
                productsCount = _a.sent();
                if (productsCount > 0) {
                    res.send("Seed is already done");
                }
                return [4 /*yield*/, products_model_1.ProductsModel.create(data_1.jewellers)];
            case 2:
                _a.sent();
                res.send("Seed is Done!");
                return [2 /*return*/];
        }
    });
}); }));
router.get("/", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products_model_1.ProductsModel.find()];
            case 1:
                products = _a.sent();
                res.send(products);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/search/:searchTerm", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchRegExp, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchRegExp = new RegExp(req.params.searchTerm, "i");
                return [4 /*yield*/, products_model_1.ProductsModel.find({
                        name: { $regex: searchRegExp },
                    })];
            case 1:
                products = _a.sent();
                res.send(products);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/metalType", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var metalType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products_model_1.ProductsModel.aggregate([
                    {
                        $unwind: "$metalType",
                    },
                    {
                        $group: {
                            _id: "$metalType",
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: "$_id",
                        },
                    },
                ]).sort({ count: -1 })];
            case 1:
                metalType = _a.sent();
                res.send(metalType);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/metalType/:metalTypeName", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products_model_1.ProductsModel.find({
                    metalType: req.params.metalTypeName,
                })];
            case 1:
                product = _a.sent();
                res.send(product);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/category", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, all;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, products_model_1.ProductsModel.aggregate([
                    {
                        $unwind: "$category",
                    },
                    {
                        $group: {
                            _id: "$category",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: "$_id",
                            count: "$count",
                        },
                    },
                ]).sort({ count: -1 })];
            case 1:
                category = _b.sent();
                _a = {
                    name: "All"
                };
                return [4 /*yield*/, products_model_1.ProductsModel.countDocuments()];
            case 2:
                all = (_a.count = _b.sent(),
                    _a);
                category.unshift(all);
                res.send(category);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/category/:categoryName", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products_model_1.ProductsModel.find({
                    category: req.params.categoryName,
                })];
            case 1:
                product = _a.sent();
                res.send(product);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/:productId", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products_model_1.ProductsModel.findById(req.params.productId)];
            case 1:
                product = _a.sent();
                res.send(product);
                return [2 /*return*/];
        }
    });
}); }));
router.delete("/deleteProduct/:productId", function (req, res) {
    products_model_1.ProductsModel.deleteOne({ _id: req.params.productId }).then(function (result) { });
    res.status(200).json({ message: "Product deleted!" });
});
//
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
router.post("/upload", upload.single("image"), function (req, res) {
    res.json({
        imageUrl: "http://localhost:3000/uploads/".concat(req.file.filename),
    });
});
//
router.post("/addProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, imageDis, imageHov, description, category, metalType, weight, mc, size, stock, wastage, price, product, newProduct, dbProduct;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, imageDis = _a.imageDis, imageHov = _a.imageHov, description = _a.description, category = _a.category, metalType = _a.metalType, weight = _a.weight, mc = _a.mc, size = _a.size, stock = _a.stock, wastage = _a.wastage, price = _a.price;
                return [4 /*yield*/, products_model_1.ProductsModel.findOne({ name: name })];
            case 1:
                product = _b.sent();
                if (product) {
                    res.status(404).send("Product already present");
                    return [2 /*return*/];
                }
                newProduct = {
                    id: "",
                    name: name,
                    imageDis: imageDis,
                    imageHov: imageHov,
                    description: description,
                    metalType: metalType.toLowerCase(),
                    category: category,
                    weight: weight,
                    mc: mc,
                    size: size,
                    stock: stock,
                    wastage: (wastage / 100),
                    price: price
                };
                return [4 /*yield*/, products_model_1.ProductsModel.create(newProduct)];
            case 2:
                dbProduct = _b.sent();
                res.send(dbProduct);
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
