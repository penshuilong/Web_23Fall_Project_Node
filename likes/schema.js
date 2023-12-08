import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  idMeal: String,
  strMeal: String,
  strMealThumb: String, 
}, { collection: "likes" });


export default schema;
