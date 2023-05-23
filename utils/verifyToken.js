import jwt from "jsonwebtoken";
import { createError } from "./error.js";

//authorization middleware checks

export const verifyToken = (req, res, next) => {
  //get access token from cookie and check if it is valid
  const token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorised" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  //check if user is authenticated
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "You're not authenticated" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  //check if user is an admin
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "You're not authenticated" });
    }
  });
};
