import model from "./model.js";

export const findAllLikes = () => model.find();
export const createUserLikesfood = (userId, foodId) =>
  model.create({ user: userId, foodId: foodId });
export const deleteUserLikesfood = (userId, foodId) =>
  model.deleteOne({ user: userId, foodId: foodId });
export const findUsersThatLikefood = (foodId) =>
  model.find({ foodId: foodId }).populate("user");
export const findfoodsThatUserLikes = (userId) => model.find({ user: userId });
