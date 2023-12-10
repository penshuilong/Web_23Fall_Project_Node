import mongoose from "mongoose";
import sellerMealSchema from "./schema.js";

const SellerMealModel = mongoose.model("sellermeals", sellerMealSchema);
export default SellerMealModel;
