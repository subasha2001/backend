import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.router";
import { dbConnect } from "./configs/db.config";
import bannerRouter from "./routes/banner.router";
import userRouter from "./routes/user.router";
import bodyParser from "body-parser";
import orderRouter from "./routes/order.router";
import goldSilver from "./routes/goldSilver.router";
import reviewsRouter from "./routes/reviews.router";
import mailerRouter from "./routes/mailer.router";
dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    methods: ["GET,POST,PUT,DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "access_token"],
    origin: ["https://apsinfotech.in", "http://localhost:4200", "http://13.61.105.213"],
    credentials: true,
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
app.use("/api/mailer", mailerRouter);
// app.use("/api", addImage);
app.use("/uploads", express.static("uploads"));

const port = 3001;

app.listen(port, () => {
  console.log("connected to " + port);
});

// "build": "npm install && tsc"