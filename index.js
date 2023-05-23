import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import tripRouter from "./routes/trips.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import oauthRouter from "./routes/oauth.js"; 
import { checkOauthKey } from "./controllers/oauthController.js"; 

// configure .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//define cors options 
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://triphopper.netlify.app",
    "https://admin-triphopper.netlify.app"
  ],
  credentials: true,
};

// function to connect to mongodb
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    throw error;
  }
};

//middlwares

app.use(
  cookieSession({
    name: "session",
    keys: ["abdallah"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//define routes
app.use("/api/v1/oauth", oauthRouter);
//apply oauth middleware for all trip routes
app.use("/api/v1/trips", checkOauthKey, tripRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
