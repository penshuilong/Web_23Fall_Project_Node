import express from 'express'
import session from "express-session";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/5610project");
const app = express()
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
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
app.listen(process.env.PORT || 4000);