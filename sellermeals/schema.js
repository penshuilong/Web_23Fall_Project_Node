import mongoose from "mongoose";

const sellerMealSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            ref: "users",
        },
        sellerMeal: [{
            type: String,
        }],
    },
    {
        collection: "sellermeals",
    }
);

export default sellerMealSchema;
