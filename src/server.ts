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
import path from "path";
import reviewsRouter from "./routes/reviews.router";
dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    origin: "https://imaginative-baklava-28f8d7.netlify.app",
    // origin: ["https://localhost:4200"],
  })
);

app.options("*", cors());

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

const port = 80;

// if(process.env.NODE_ENV == 'production'){
//   app.use(express.static(path.join(__dirname, '..', 'dist', 'frontend', 'browser')));
//   app.get('/*', (req, res)=>{
//     res.sendFile(
//       path.join(__dirname, "..", "frontend", "dist", "frontend", "browser", "index.html")
//     );
//   })
// }

app.listen(port, () => {
  console.log("connected to " + port);
});

// "build": "npm install && tsc"