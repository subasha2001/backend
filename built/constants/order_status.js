"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
//enumeration - kanakeedu
// by using enum we have structure and we can use it as a type,
// that will be limited to the items that this enum offers
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["NEW"] = "NEW";
    OrderStatus["PAYED"] = "PAYED";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["CANCELED"] = "CANCELED";
    OrderStatus["REFUNDED"] = "REFUNDED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
