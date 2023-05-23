import Oauth from "../models/Oauth.js";
import bcrypt from "bcryptjs";

// get oauth key with the clientid and secret
export const getOauthKey = async (req, res, next) => {
  //clientid and secret are passed as headers
  const clientId = req.headers.clientid;
  const secret = req.headers.secret;

  //check if the data exists in database
  let oauthData = await Oauth.findOne({clientId, secret})

  if (!oauthData) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  //set key as the key defined in database
  let key = oauthData.key;

  //if there is no key, generate a key
  if (!key) {
    //use hashing function to secure key
    key = bcrypt.hashSync(clientId + secret);
    //update key in database 
    oauthData = await Oauth.findByIdAndUpdate(
      oauthData._id,
      { key },
      { new: true }
    );
  }

  //send key as response
  res.status(200).json({ key });
};

//middleware to check if oauthkey is valid
export const checkOauthKey = async (req, res, next) => {
  const oauthKey = req.headers.key;

  if (!oauthKey) {
    return res.status(400).json({
      success: false,
      message: "Missing Key",
    });
  }

  //check if key is valid
  const key = await Oauth.findOne({ key: oauthKey });

  if (!key) {
    return res.status(400).json({
      success: false,
      message: "Invalid Key",
    });
  }

  next();
};
