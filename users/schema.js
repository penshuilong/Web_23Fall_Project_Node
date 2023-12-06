import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: String,
    restaurantName: String,
    restaurantAddress: String,
    role: {
      type: String,
      enum: ["MANAGER", "SELLER", "USER"],
      default: "USER" },
  },
  { collection: "users" });
export default userSchema;
