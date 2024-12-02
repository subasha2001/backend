import { Router } from "express";
import asyncHandler from "express-async-handler";
import { jewelleryType } from "../dataType";
import { ProductsModel } from "../models/products.model";
import { jewellers } from "../data";
import multer from "multer";
const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const productsCount = await ProductsModel.countDocuments();
    if (productsCount > 0) {
      res.send("Seed is already done");
    }
    await ProductsModel.create(jewellers);
    res.send("Seed is Done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductsModel.find();
    res.send(products);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegExp = new RegExp(req.params.searchTerm, "i");
    const products = await ProductsModel.find({
      $or: [
        { name: { $regex: searchRegExp } },
        { description: { $regex: searchRegExp } },
        { category: { $regex: searchRegExp } },
        { metalType: { $regex: searchRegExp } },
      ],
    });
    res.send(products);
  })
);

router.get(
  "/metalType",
  asyncHandler(async (req, res) => {
    const metalType = await ProductsModel.aggregate([
      {
        $unwind: "$metalType",
      },
      {
        $group: {
          _id: "$metalType",
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
        },
      },
    ]).sort({ count: -1 });
    res.send(metalType);
  })
);
router.get(
  "/metalType/:metalTypeName",
  asyncHandler(async (req, res) => {
    const product = await ProductsModel.find({
      metalType: req.params.metalTypeName,
    });
    res.send(product);
  })
);

router.get(
  "/category",
  asyncHandler(async (req, res) => {
    try {
      // Get all unique categories
      const categories = await ProductsModel.distinct("category");
      const categoryCounts = [];

      // Loop through each category to count occurrences
      for (const category of categories) {
        const count = await ProductsModel.countDocuments({ category });
        categoryCounts.push({ name: category, count });
      }

      // Add the "All" category with the total count
      const allCount = await ProductsModel.countDocuments();
      categoryCounts.unshift({ name: "All", count: allCount });

      res.send(categoryCounts);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);
// router.get(
//   "/category",
//   asyncHandler(async (req, res) => {
//     const category = await ProductsModel.aggregate([
//       {
//         $unwind: "$category",
//       },
//       {
//         $group: {
//           _id: "$category",
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           name: "$_id",
//           count: "$count",
//         },
//       },
//     ]).sort({ count: -1 });

//     const all = {
//       name: "All",
//       count: await ProductsModel.countDocuments(),
//     };
//     category.unshift(all);
//     res.send(category);
//   })
// );

router.get(
  "/category/:categoryName",
  asyncHandler(async (req, res) => {
    const product = await ProductsModel.find({
      category: req.params.categoryName,
    });
    res.send(product);
  })
);

router.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    const product = await ProductsModel.findById(req.params.productId);
    res.send(product);
  })
);

router.delete("/deleteProduct/:productId", (req, res) => {
  ProductsModel.deleteOne({ _id: req.params.productId }).then((result) => {});
  res.status(200).json({ message: "Product deleted!" });
});

router.put("/getProductValue/:productId", async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;

  if (typeof updatedData.categories === "string") {
    updatedData.categories = updatedData.categories
      .split(",")
      .map((category: any) => category.trim());
  }

  try {
    const updatedItem = await ProductsModel.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedItem) {
      return res.status(404).send("Item not found");
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    imageUrl: `${req.file!.filename}`,
  });
});
//`

router.post(
  "/addProduct",
  asyncHandler(async (req, res) => {
    const {
      name,
      imageDis,
      imageHov,
      description,
      category,
      metalType,
      weight,
      mc,
      size,
      stock,
      wastage,
      price,
    } = req.body;
    const product = await ProductsModel.findOne({ name });
    if (product) {
      res.status(404).send("Product already present");
      return;
    }
    const newProduct = new ProductsModel({
      name,
      imageDis,
      imageHov,
      description,
      metalType: metalType.toLowerCase(),
      category,
      weight,
      mc,
      size,
      stock,
      wastage: wastage / 100,
      price,
    });
    await newProduct.save();
    res.status(200).send(newProduct);
  })
);

export default router;
