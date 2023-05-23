import express from "express";
import { getOauthKey, checkOauthKey} from "../controllers/oauthController.js";

const oauthRouter = express.Router();

//oauth route using the oauth controller
oauthRouter.get("/key", getOauthKey);

//middleware
oauthRouter.use(checkOauthKey);

export default oauthRouter;
