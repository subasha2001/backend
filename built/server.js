"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var products_router_1 = __importDefault(require("./routes/products.router"));
var db_config_1 = require("./configs/db.config");
var banner_router_1 = __importDefault(require("./routes/banner.router"));
var user_router_1 = __importDefault(require("./routes/user.router"));
var addImage_router_1 = __importDefault(require("./routes/addImage.router"));
var body_parser_1 = __importDefault(require("body-parser"));
var order_router_1 = __importDefault(require("./routes/order.router"));
var goldSilver_router_1 = __importDefault(require("./routes/goldSilver.router"));
var reviews_router_1 = __importDefault(require("./routes/reviews.router"));
(0, db_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"],
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api/products", products_router_1.default);
app.use("/api/banner", banner_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/orders", order_router_1.default);
app.use("/api/goldSilver", goldSilver_router_1.default);
app.use("/api/reviews", reviews_router_1.default);
app.use("/api", addImage_router_1.default);
app.use("/uploads", express_1.default.static("uploads"));
var port = 3000;
// if(process.env.NODE_ENV == 'production'){
//   app.use(express.static(path.join(__dirname, '..', 'dist', 'frontend', 'browser')));
//   app.get('/*', (req, res)=>{
//     res.sendFile(
//       path.join(__dirname, "..", "frontend", "dist", "frontend", "browser", "index.html")
//     );
//   })
// }
app.listen(port, function () {
    console.log("connected to " + port);
});
