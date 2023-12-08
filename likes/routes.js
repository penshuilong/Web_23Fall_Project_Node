import * as dao from "./dao.js";

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {};
 
  const createUserLikesMeal = async (req, res) => {
  const userId = req.params.userId;
  const idMeal = req.params.idMeal;
  const { strMeal, strMealThumb } = req.body; 
  const likes = await dao.createUserLikesMeal(userId, idMeal, strMeal, strMealThumb);
  res.json(likes);
};

  const deleteUserLikesMeal = async (req, res) => {};
  const findUsersThatLikeMeal = async (req, res) => {
    const idMeal = req.params.idMeal;

    const likes = await dao.findUsersThatLikeMeal(idMeal);
    res.json(likes);
  };
  const findMealsThatUserLikes = async (req, res) => {
    const userId = req.params.userId;
    const likes = await dao.findMealsThatUserLikes(userId);
    res.json(likes);
  };
  app.get("/api/likes", findAllLikes);
  app.post("/api/users/:userId/likes/:idMeal", createUserLikesMeal);
  app.delete("/api/users/:userId/likes/:idMeal", deleteUserLikesMeal);
  app.get("/api/likes/:idMeal/users", findUsersThatLikeMeal);
  app.get("/api/users/:userId/likes", findMealsThatUserLikes);
}

export default LikesRoutes;
