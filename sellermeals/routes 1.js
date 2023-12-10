import express from "express";
import * as sellerMealDAO from "./dao.js";
import UserModel from "../users/model.js";
// 导入User模型

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, sellerMeal } = req.body;
    // 验证用户名是否属于SELLER
    const user = await UserModel.findOne({ username, role: 'SELLER' });
    if (!user) {
        return res.status(400).send('Invalid seller username');
    }
    // 更新 sellerMeal
    try {
        const updatedSellerMeal = await sellerMealDAO.addMealToSeller(username, sellerMeal);
        res.status(201).json(updatedSellerMeal);
    } catch (error) {
        console.error("Error updating seller meal", error);
        res.status(500).send('Error updating seller meal');
    }
});

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const sellerMeals = await sellerMealDAO.findSellerMealsByUsername(username);
    res.json(sellerMeals);
});

router.get('/', async (req, res) => {
    // 逻辑来获取所有的 seller meals
    const sellerMeals = await sellerMealDAO.findAllSellerMeals(); // 假设这是一个从DAO获取所有seller meals的函数
    res.json(sellerMeals);
});
// ...其他需要的路由...


router.delete('/:username/:mealIdentifier', async (req, res) => {
    const { username, mealIdentifier } = req.params;

    try {
        // 验证用户名是否属于SELLER
        const user = await UserModel.findOne({ username, role: 'SELLER' });
        if (!user) {
            return res.status(400).send('Invalid seller username');
        }

        // 删除特定的菜品
        const result = await sellerMealDAO.deleteSellerMeal(username, mealIdentifier);  // 使用 mealIdentifier

        res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting meal", error);
        res.status(500).send('Error deleting meal');
    }
});

export default router;
