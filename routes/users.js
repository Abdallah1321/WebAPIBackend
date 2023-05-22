import express from "express";
import {deleteUser, getUser, getUsers, updateUser} from "../controllers/userController.js";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";

const usersRouter = express.Router()

//UPDATE
usersRouter.put("/:id", verifyUser, updateUser)

//DELETE
usersRouter.delete("/:id", verifyUser, deleteUser)

//GET
usersRouter.get("/:id", verifyUser, getUser)

//GET ALL
usersRouter.get("/", getUsers)

export default usersRouter