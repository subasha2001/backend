import mongoose, { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URI!, { } as ConnectOptions).then(
    () => console.log("Connected successfully to mongodb"),
    (error) => console.log(error)
  );
}