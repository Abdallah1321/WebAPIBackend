import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tripRouter from "./routes/trips.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (err) {
    console.log("Database connection failed!");
  }
};

//middlwares

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/trips", tripRouter);

app.listen(port, () => {
  connectDB();
  console.log("server listening on port", port);
});
