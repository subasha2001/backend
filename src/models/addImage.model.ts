import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
});

const user = mongoose.model("User", userSchema);

export default user;