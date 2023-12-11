import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  idMeal: String,
  strMeal: String, 
  strComments: String,
}, { collection: "comments" });


export default schema;