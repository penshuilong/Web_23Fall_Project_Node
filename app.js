import express from 'express'
import session from "express-session";
import UserRoutes from "./users/routes.js";
import FollowsRoutes from "./follows/routes.js";
import LikesRoutes from "./likes/routes.js";
// import router from './sellermeals/routes.js';
import cors from "cors";
import sellerMealRoutes from './sellermeals/routes.js';
import "dotenv/config";
import mongoose from "mongoose";
import CommentsRoutes from "./comments/routes.js";

// mongoose.connect("mongodb://127.0.0.1:27017/5610project");
mongoose.connect("mongodb+srv://zihanzhao1999:36c33s0326ZH@cluster0.wi4vzv2.mongodb.net/5610project?retryWrites=true&w=majority");
const app = express()
app.use(
  cors({
    credentials: true,
    origin: 'https://silly-tarsier-6acc48.netlify.app',
    //origin: "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());
UserRoutes(app);
FollowsRoutes(app);
LikesRoutes(app);
CommentsRoutes(app);

app.use('/api/sellermeals', sellerMealRoutes);

app.listen(process.env.PORT || 4000);
