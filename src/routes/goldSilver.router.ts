import { Router } from "express";
import asyncHandler from "express-async-handler";
import { GoldSilverModel } from "../models/products.model";
import { rates } from "../dataType";
const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const gsgst = await GoldSilverModel.countDocuments();
    if (gsgst > 0) {
      res.send("Seed is already done, banner!");
    }

    await GoldSilverModel.create(rates);
    res.send("Seed is Done!");
  })
);

router.post(
  "/goldSilverRate",
  asyncHandler(async (req, res) => {
    const { gold22, gold24, gold18, silver, gst } = req.body;

    await GoldSilverModel.deleteMany({});
    const gsgst = await GoldSilverModel.findOne({ gold22 });
    if (gsgst) {
      res.status(404).send("already present");
      return;
    }

    const new_gsgst: any = {
      gold22,
      gold24,
      gold18,
      silver,
      gst: gst / 100,
    };
    const dbGSGst = await GoldSilverModel.create(new_gsgst);
    res.send(dbGSGst);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const gsgst = await GoldSilverModel.find();
    res.send(gsgst);
  })
);

export default router;