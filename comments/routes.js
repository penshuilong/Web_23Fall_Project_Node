import { BaseUserModel } from "../users/model.js";
import * as dao from "./dao.js";
import { findUserById } from "../users/dao.js"; 

function CommentsRoutes(app) {
  // 获取所有评论
  const findAllComments = async (req, res) => {
    const comments = await dao.findAllComments();
    res.json(comments);
  };

  // 创建评论
  const createUserCommentsMeal = async (req, res) => {
    const userId = req.params.userId;
    const idMeal = req.params.idMeal;
    const { strMeal, strComments } = req.body;
    try {
      const user = await findUserById(userId);  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const comment = await dao.createUserCommentsMeal(userId, idMeal, strMeal, strComments);
      res.json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Error creating comment" });
    }
  };
  

  // 删除评论
  const deleteUserCommentsMeal = async (req, res) => {
    const userId = req.params.userId;
    const idMeal = req.params.idMeal;
    
    // 删除评论
    await dao.deleteUserCommentsMeal(userId, idMeal);
    res.sendStatus(204); // 204 No Content
  };

  // 获取喜欢某餐品的用户
  const findUsersThatCommentMeal = async (req, res) => {
    const idMeal = req.params.idMeal;
    
    // 查找评论该餐品的用户
    const comments = await dao.findUsersThatCommentsMeal(idMeal);
    res.json(comments);
  };

  // 获取用户评论的所有餐品
  const findMealsThatUserComments = async (req, res) => {
    const userId = req.params.userId;
    
  // 查找用户评论过的所有餐品
  const comments = await dao.findMealsThatUserComments(userId);
    res.json(comments);
  };

  
  app.get("/api/comments", findAllComments);
  app.post("/api/users/:userId/comments/:idMeal", createUserCommentsMeal);
  app.delete("/api/users/:userId/comments/:idMeal", deleteUserCommentsMeal);
  app.get("/api/comments/:idMeal/users", findUsersThatCommentMeal);
  app.get("/api/users/:userId/comments", findMealsThatUserComments);
}

export default CommentsRoutes;
