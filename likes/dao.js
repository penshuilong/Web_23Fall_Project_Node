import model from "./model.js";

export const findAllLikes = () => model.find();
export const createUserLikesMeal = (userId, idMeal,strMeal) =>
  model.create({ user: userId, idMeal: idMeal, strMeal: strMeal });
export const deleteUserLikesMeal = (userId, idMeal) =>
  model.deleteOne({ user: userId, idMeal: idMeal });
export const findUsersThatLikeMeal = (idMeal) =>
  model.find({ idMeal: idMeal }).populate("user");
export const findMealsThatUserLikes = (userId) => model.find({ user: userId });
