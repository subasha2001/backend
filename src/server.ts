import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.router";
import { dbConnect } from "./configs/db.config";
import bannerRouter from "./routes/banner.router";
import userRouter from "./routes/user.router";
import addImage from "./routes/addImage.router";
import bodyParser from "body-parser";
import orderRouter from "./routes/order.router";
import goldSilver from "./routes/goldSilver.router";
import reviewsRouter from "./routes/reviews.router";
dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/goldSilver", goldSilver);
app.use("/api/reviews", reviewsRouter);
app.use("/api", addImage);
app.use("/uploads", express.static("uploads")); 

const port = 3000;

app.listen(port, () => {
  console.log("connected to " + port);
});


    // "build": "npm install && tsc"