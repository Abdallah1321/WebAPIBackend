import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
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
