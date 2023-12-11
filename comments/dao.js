import model from "./model.js";

export const findAllComments = () => model.find();
export const createUserCommentsMeal = (userId, idMeal, strMeal, strComments) =>
  model.create({ user: userId, idMeal: idMeal, strMeal: strMeal, strComments: strComments });
export const deleteUserCommentsMeal = (userId, idMeal) =>
  model.deleteOne({ user: userId, idMeal: idMeal });
export const findUsersThatCommentsMeal = (idMeal) =>
  model.find({ idMeal: idMeal }).populate("user");
export const findMealsThatUserComments = (userId) => model.find({ user: userId });
