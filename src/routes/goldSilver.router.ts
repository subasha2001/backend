import { Router } from "express";
import asyncHandler from "express-async-handler";
import { DC, rates } from "../dataType";
import { GoldSilverModel } from "../models/goldSilver.model";
import { DeliveryChargeModel } from "../models/products.model";
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
router.get(
  "/DCU/seed",
  asyncHandler(async (req, res) => {
    const DCU = await DeliveryChargeModel.countDocuments();
    if (DCU > 0) {
      res.send("Seed is already done, banner!");
    }

    await DeliveryChargeModel.create(DC);
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

router.post("/delivery-charge", async (req, res) => {
  try {
    const { pincode, charge } = req.body;

    if (!pincode || charge === undefined) {
      return res.status(400).json({ error: "Pincode and charge are required" });
    }

    const updatedCharge = await DeliveryChargeModel.findOneAndUpdate(
      { pincode },
      { charge },
      { new: true, upsert: true } // Upsert creates if not found
    );

    res.json({
      message: "Delivery charge updated successfully",
      data: updatedCharge,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/delivery-charge/:pincode", async (req, res) => {
  const { pincode } = req.params;
  try {
    const charge = await DeliveryChargeModel.findOne({ pincode: pincode });
    if (!charge) {
      return res
        .status(404)
        .json({ message: "Delivery charge not found for this pincode" });
    }
    res.json(charge);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/delivery-charge/:pincode", async (req, res) => {
  try {
    const { pincode } = req.params;
    const { charge } = req.body;

    if (!charge && charge !== 0) {
      return res.status(400).json({ error: "Charge is required" });
    }

    const updatedCharge = await DeliveryChargeModel.findOneAndUpdate(
      { pincode },
      { charge },
      { new: true } // Return the updated document
    );

    if (!updatedCharge) {
      return res.status(404).json({ error: "Pincode not found" });
    }

    res.json({
      message: "Delivery charge updated successfully",
      data: updatedCharge,
    });
  } catch (error:any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

export default router;