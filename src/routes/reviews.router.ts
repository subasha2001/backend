import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ReviewModel } from "../models/banner.model";
const router = Router();

router.post(
  "/post",
  asyncHandler(async (req, res) => {
    const { productName, imageDis, name, number, review } = req.body;


    const newReview: any = {
      productName,
      imageDis,
      name,
      number,
      review,
    };
    const dbReview = await ReviewModel.create(newReview);
    res.send(dbReview);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find();
    res.send(reviews);
  })
);

export default router;