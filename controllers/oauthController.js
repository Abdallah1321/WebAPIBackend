import Oauth from "../models/Oauth.js";

const getOauthKey = async (req, res, next) => {
  clientId = req.headers.clientId;
  secret = req.headers.secret;

  const data = await Oauth.findOne({ clientId, secret });
};
