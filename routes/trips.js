import express from "express";
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  getWeather,
  getTrip,
  getTripBySearch,
  updateTrip,
  getFood,
  getCurrency,
} from "../controllers/tripController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const tripRouter = express.Router();

//Create trip
tripRouter.post("/", verifyAdmin, createTrip);

//Update trip
tripRouter.put("/:id", verifyAdmin, updateTrip);

//Delete trip
tripRouter.delete("/:id", verifyAdmin, deleteTrip);

//Get trip
tripRouter.get("/:id", getTrip);

//Get all trip
tripRouter.get("/", getAllTrips);

//Search for trip
tripRouter.get("/search/getTripBySearch", getTripBySearch);

tripRouter.get("/:id/getWeather", getWeather);
tripRouter.get("/:id/getFood", getFood);
tripRouter.get("/:id/getExchange", getCurrency);

export default tripRouter;
