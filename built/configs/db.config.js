"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URI, {}).then(function () { return console.log('Connected successfully to mongodb'); }, function (error) { return console.log(error); });
};
exports.dbConnect = dbConnect;
//
// const uri = "mongodb://localhost:27017/testdb";
// // Connect to the database
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Successfully connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error.message);
//   });
