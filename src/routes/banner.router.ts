import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { bannerType } from "../dataType";
import { BannerModel } from "../models/banner.model";
import { banner } from "../data";
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const bannerCount = await BannerModel.countDocuments();
        if (bannerCount > 0) {
            res.send("Seed is already done, banner!")
        }

        await BannerModel.create(banner);
        res.send("Seed is Done!");
    }))

router.delete('/deleteBanner/:productId', (req, res) => {
    BannerModel.deleteOne({ _id: req.params.productId }).then(result => { });
    res.status(200).json({ message: 'Banner deleted!' });
})



router.post("/addBanner", asyncHandler(
    async (req, res) => {
        const { image } = req.body;
        const banner = await BannerModel.findOne({ image });
        if (banner) {
            res.status(404).send('Product already present');
            return
        }

        const newBanner: bannerType = {
            id: '',
            image
        }
        const dbBanner = await BannerModel.create(newBanner);
        res.send(dbBanner);
    }
))
router.get("/",asyncHandler(async (req, res) => {
    const bannerImages = await BannerModel.find();
    res.send(bannerImages);
  })
);

export default router;