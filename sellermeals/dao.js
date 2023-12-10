import SellerMealModel from "./model.js";

export const createSellerMeal = (sellerMeal) => SellerMealModel.create(sellerMeal);
export const findSellerMealsByUsername = (username) => SellerMealModel.find({ username });
export const findAllSellerMeals = () => SellerMealModel.find({});
export const deleteSellerMeal = async (username, mealIdentifier) => {
    return await SellerMealModel.findOneAndUpdate(
        { username },
        { $pull: { sellerMeal: mealIdentifier } },
        { new: true }
    );
};
export const addMealToSeller = async (username, mealIdentifier) => {
    return await SellerMealModel.findOneAndUpdate(
        { username },
        { $push: { sellerMeal: mealIdentifier } },
        { new: true, upsert: true } // upsert: true 将创建文档，如果它不存在
    );
};