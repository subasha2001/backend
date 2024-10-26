import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderItem, OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import auth from "../middlewares/auth.mid";
import { ProductsModel } from "../models/products.model";

const router = Router();
router.use(auth);

router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;
    const cartItems = req.body.items;
    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send("Cart is empty");
      return;
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    try {
      const product = await ProductsModel.findById({
        id: cartItems.product._id,
      });
      if (!product) {
        return res.status(404).send("Product Not Found");
      }

      if (product.stock < requestOrder.quantity) {
        return res.status(400).send("Not enough stock available");
      }
      const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
      await newOrder.save();

      product.stock = product.stock - requestOrder.quantity;
      await product.save();

      res.send(newOrder);
    } catch (err) {
      res.status(500).send(err);
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

router.post(
  "/pay",
  asyncHandler(async (req: any, res) => {
    const { paymentId } = req.body.paymentId;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
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
