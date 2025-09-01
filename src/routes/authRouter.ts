import express from "express";
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/authController";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

export { userRouter };
