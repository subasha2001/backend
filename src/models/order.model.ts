import { model, Schema, Types } from "mongoose";
import { Jewellery, ProductSchema } from "./products.model";
import { OrderStatus } from "../constants/order_status";

export interface OrderItem {
  product: Jewellery;
  price: number;
  quantity: number;
}
export const OrderItemSchema = new Schema<OrderItem>({
  product: { type: ProductSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  pincode: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature:string;
  status: OrderStatus;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export const OrderSchema = new Schema<Order>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model("order", OrderSchema);