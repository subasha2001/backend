import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { Order, OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import auth from "../middlewares/auth.mid";
import Razorpay from "razorpay";
import { ProductsModel } from "../models/products.model";
import { UserModel } from "../models/user.model";
import { sendPaymentConfirmationEmailForUser } from "./mailer.router";
import { sendPaymentConfirmationEmailForAdmin } from "./mailer.router";

const router = Router();
router.use(auth);

const razorpay = new Razorpay({
  key_id: process.env.RPAY_KEY!,
  key_secret: process.env.RPAY_SECRET!,
});

router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder: Order = req.body;
    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send("Cart is empty");
      return;
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    try {
      for (const item of requestOrder.items) {
        const product = await ProductsModel.findById(item.product.id);

        if (!product) {
          return res
            .status(404)
            .send({ error: `Product not found for ID: ${item.product.id}` });
        }

        // Ensure stock is greater than 0
        if (product.stock < item.quantity) {
          return res.status(400).send({
            error: `Insufficient stock for product ID: ${item.product.id}. Available stock: ${product.stock}`,
          });
        }
      }
    } catch (error) {}
    //
    for (const item of requestOrder.items) {
      const options = {
        amount: requestOrder.totalPrice * 100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
        payment_capture: 1,
      };

      try {
        const razorpayOrder = await razorpay.orders.create(options);

        const newOrder = new OrderModel({
          ...requestOrder,
          user: req.user.id,
          razorpayOrderId: razorpayOrder.id,
          status: OrderStatus.NEW,
        });

        await newOrder.save();
        res
          .status(201)
          .send({ order: newOrder, razorpayOrderId: razorpayOrder.id });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  })
);

const crypto = require("crypto");
router.post(
  "/verify-payment",
  asyncHandler(async (req: any, res: any) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const hmac = crypto.createHmac("sha256", process.env.RPAY_SECRET!);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature === razorpay_signature) {
      const order = await OrderModel.findOne({
        razorpayOrderId: razorpay_order_id,
      });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const user = await UserModel.findOne({
        _id: order.user,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      try {
        for (const item of order.items) {
          await ProductsModel.findByIdAndUpdate(item.product.id, {
            $inc: { stock: -item.quantity },
          });
        }

        order.status = OrderStatus.PAYED;
        await order.save();

        await sendPaymentConfirmationEmailForUser(user.email, order);
        await sendPaymentConfirmationEmailForAdmin(user, order);

        res.status(200).send({
          message: "Payment verified, order confirmed, and stock updated",
        });
      } catch (err) {
        console.error("Error while updating stock:", err);
        res.status(500).json({ error: "Failed to update stock" });
      }
    } else {
      res.status(400).json({ error: "Invalid payment signature" });
    }
  })
);

router.get(
  "/newOrderForCurrentUser",
  asyncHandler(async (req: any, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
  })
);

router.get(
  "track/:id",
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
  })
);
export default router;

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}
