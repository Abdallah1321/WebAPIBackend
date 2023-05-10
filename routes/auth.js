import express from "express";
import { login, loginFail, loginSuccess, logout, register } from "../controllers/authController.js";
import passport from "passport";
import { verifyToken } from "../utils/verifyToken.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get('/logout', logout)



export default authRouter;
