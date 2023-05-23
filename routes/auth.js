import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import passport from "passport";
import { verifyToken } from "../utils/verifyToken.js";

const authRouter = express.Router();

// auth routes using auth controller
authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get('/logout', logout)



export default authRouter;
