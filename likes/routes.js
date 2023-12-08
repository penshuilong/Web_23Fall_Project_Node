import * as dao from "./dao.js";

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {};
  const createUserLikesfood = async (req, res) => {
    const userId = req.params.userId;
    const foodId = req.params.foodId;
    const likes = await dao.createUserLikesfood(userId, foodId);
    res.json(likes);
  };
  const deleteUserLikesfood = async (req, res) => {};
  const findUsersThatLikefood = async (req, res) => {
    const foodId = req.params.foodId;

    const likes = await dao.findUsersThatLikefood(foodId);
    res.json(likes);
  };
  const findfoodsThatUserLikes = async (req, res) => {
    const userId = req.params.userId;
    const likes = await dao.findfoodsThatUserLikes(userId);
    res.json(likes);
  };
  app.get("/api/likes", findAllLikes);
  app.post("/api/users/:userId/likes/:foodId", createUserLikesfood);
  app.delete("/api/users/:userId/likes/:foodId", deleteUserLikesfood);
  app.get("/api/likes/:foodId/users", findUsersThatLikefood);
  app.get("/api/users/:userId/likes", findfoodsThatUserLikes);
}

export default LikesRoutes;
