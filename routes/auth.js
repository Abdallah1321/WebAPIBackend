import express from "express";
import { login, loginFail, loginSuccess, logout, register } from "../controllers/authController.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get('/login/success', loginSuccess)
authRouter.get('/login/failed', loginFail)
authRouter.get('/logout', logout)

authRouter.get('/google/callback', passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
}))


authRouter.get('/google', passport.authenticate("google", ["profile", "email"]))

export default authRouter;
