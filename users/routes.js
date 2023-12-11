import * as dao from "./dao.js";
function UserRoutes(app) {

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  
  app.post("/api/users", createUser);

  
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    try {
      const existingUser = await dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const currentUser = await dao.createUser(req.body);
      console.log("req.body");
      console.log(req.body);
      req.session['currentUser'] = currentUser;
      console.log("currentUser");
      console.log(currentUser);
      res.json(currentUser);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    console.log(currentUser);
    if (currentUser) {
      req.session['currentUser'] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  };
  


  
   const signout = (req, res) => {
    req.session.destroy();

    res.json(200);
  };

  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };

  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };


  



  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
  app.get("/api/users/username/:username", findByUsername);

}
export default UserRoutes;