import express from "express";
import { getOauthKey, checkOauthKey} from "../controllers/oauthController.js";

const oauthRouter = express.Router();


oauthRouter.get("/key", getOauthKey);

oauthRouter.use(checkOauthKey);

export default oauthRouter;
