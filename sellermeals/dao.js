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

export const deleteAllSellerMealsForUser = async (username) => {
    // 在这里实现删除所有与username相关的sellermeals数据的逻辑
    // 比如使用 MongoDB 的删除操作
    return await SellerMealModel.deleteMany({ username: username });
};
