import mongoose from "mongoose";

const BaseUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  dob: String,
  role: {
    type: String,
    enum: ["USER", "SELLER", "ADMIN"],
    default: "USER"
  },
}, { discriminatorKey: 'role', collection: 'users' });

const UserSchema = new mongoose.Schema({
  deliveryAddress: String
});

const SellerSchema = new mongoose.Schema({
  restaurantName: String,
  restaurantAddress: String
});

const AdminSchema = new mongoose.Schema({
  adminDurantion: String
});


export { BaseUserSchema, UserSchema,SellerSchema, AdminSchema };
