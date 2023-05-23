import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

// Registration
export const register = async (req, res) => {
  try {

    //create salt and hash function using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //create new user based on request body
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      password: hash,
    });
    
    //save user in the database
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
  const username = req.body.username;

  //check if entered username exists in database
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check credentials
    const checkCredentials = await bcrypt.compare(req.body.password, user.password);

    if (!checkCredentials) {
      return res.status(401).json({
        success: false,
        message: "Incorrect credentials! Please try again.",
      });
    }

    const { password, isAdmin, ...OtherInfo } = user._doc;
    
    //create token using jwt and send it as cookie
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

export const logout = async (req, res) =>{
  req.logout()
  res.redirect(process.env.CLIENT_URL)
}