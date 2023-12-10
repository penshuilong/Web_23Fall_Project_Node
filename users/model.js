import mongoose from "mongoose";
import { BaseUserSchema,UserSchema, SellerSchema, AdminSchema } from "./schema.js";

const BaseUserModel = mongoose.model("users", BaseUserSchema);
const UserModel = BaseUserModel.discriminator("USER", UserSchema);
const SellerModel = BaseUserModel.discriminator("SELLER", SellerSchema);
const AdminModel = BaseUserModel.discriminator("ADMIN", AdminSchema);

export { BaseUserModel, UserModel ,SellerModel, AdminModel };
