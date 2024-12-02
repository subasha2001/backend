import { Router } from "express";
import { sample_admin, sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { AdminModel } from "../models/adminUser.model";
const crypto = require("crypto");

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const productCount = await UserModel.countDocuments();
    if (productCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed is done!");
  })
);
router.get(
  "/admin/seed",
  asyncHandler(async (req, res) => {
    const productCount = await AdminModel.countDocuments();
    if (productCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await AdminModel.create(sample_admin);
    res.send("Seed is done!");
  })
);
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, number, password } = req.body;
    const user = await UserModel.findOne({ email, password, number });

    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res
        .status(HTTP_BAD_REQUEST)
        .send({ message: "Username or Password not valid!" });
    }
  })
);
router.post(
  "/admin/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email, password });

    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("Username or Password not valid!");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req:any, res:any) => {
    const { name, number, email, password, address, pincode } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User already exist, please login!");
      return;
    }

    // const encryptpassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      name,
      number,
      pincode,
      email: email.toLowerCase(),
      password,
      address,
      isAdmin: false,
    };

    const dbUser = await UserModel.create(newUser);
    res.status(201).send(generateTokenResponse(dbUser));
  })
);

const generateTokenResponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      number: user.number,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    number: user.number,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

export default router;
