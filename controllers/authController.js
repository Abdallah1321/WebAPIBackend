import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registration
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Succesfully created new user" });
  } catch (err) {
    res
      .status(500)
      .json({ success: true, message: "Failed to create new user" });
  }
};

// Login

export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const checkCredentials = await bcrypt.compare(req.body.password, user.password);

    if (!checkCredentials) {
      return res.status(401).json({
        success: false,
        message: "Incorrect credentials! Please try again.",
      });
    }

    const { password, isAdmin, ...OtherInfo } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...OtherInfo },
        isAdmin
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed!" });
  }
};
