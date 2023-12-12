import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    //   type: String,
      ref: "users",
        // required: true,
    },
    items: [
      {
        id: {
            type: String,
            required: true,
            },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        picture: {
          type: String,
          required: true,
        },
      },
    ],
    total: {
      type: Number,

    },
  },
  { collection: "cart" }
);

export default cartSchema;
