import express from "express";
import {
  checkAuth,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/User.Controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/updateProfile", verifyJWT, updateProfile);
userRouter.get("/checkAuth", verifyJWT, checkAuth);

export default userRouter;
