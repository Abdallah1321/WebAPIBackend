import Oauth from "../models/Oauth.js";
import bcrypt from "bcryptjs";

export const getOauthKey = async (req, res, next) => {
  const clientId = req.headers.clientid;
  const secret = req.headers.secret;

  let oauthData = await Oauth.findOne({clientId, secret})

  if (!oauthData) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  let key = oauthData.key;

  if (!key) {
    key = bcrypt.hashSync(clientId + secret);
    oauthData = await Oauth.findByIdAndUpdate(
      oauthData._id,
      { key },
      { new: true }
    );
  }

  res.status(200).json({ key });
};

export const checkOauthKey = async (req, res, next) => {
  const oauthKey = req.headers.key;

  if (!oauthKey) {
    return res.status(400).json({
      success: false,
      message: "Missing Key",
    });
  }

  const key = await Oauth.findOne({ key: oauthKey });

  if (!key) {
    return res.status(400).json({
      success: false,
      message: "Invalid Key",
    });
  }

  next();
};
