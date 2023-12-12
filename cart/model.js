import mongoose from "mongoose";
import cartSchema from "./schema.js";

const Cart = mongoose.model("cart", cartSchema);
export default Cart;