import { response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import Trip from "../models/Trip.js";
import User from "../models/User.js";

dotenv.config();

//Create a trip

export const createTrip = async (req, res) => {
  const newTrip = new Trip(req.body);

  try {
    const savedTrip = await newTrip.save();

    res.status(200).json({
      success: true,
      message: "Successfully created trip!",
      data: savedTrip,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while creating trip! Please try again",
    });
  }
};

//Update trip details

export const updateTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated trip!",
      data: updatedTrip,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while updating trip! Please try again",
    });
  }
};

//Delete trip details

export const deleteTrip = async (req, res) => {
  const id = req.params.id;
  try {
    await Trip.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted trip!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while delete trip! Please try again",
    });
  }
};

//Get trip details

export const getTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const trip = await Trip.findById(id);

    res.status(200).json({
      success: true,
      message: "Successfully found trip!",
      data: trip,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Trip not found! Please try again",
    });
  }
};

//Get all trip details

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
    res.status(200).json({
      success: true,
      message: "Fetched all trips!",
      data: trips,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No trips found! Please try again",
    });
  }
};

//Search for trip

export const getTripBySearch = async (req, res) => {
  const location = new RegExp(req.query.location, "i");
  const budget = parseInt(req.query.budget);

  try {
    let query = {};
    if (location && budget) {
      query = { location, budget: { $lte: budget } };
    } else if (location) {
      query = { location };
    } else if (budget) {
      query = { budget: { $lte: budget } };
    }

    const trips = await Trip.find(query);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: trips,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//Get all trip details

export const getTripCount = async (req, res) => {
  try {
    const tripCount = await Trip.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tripCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to find trips" });
  }
};

//3rd party apis

export const getWeather = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const trip = await Trip.findById(id);
    console.log(trip.destName);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${trip.destName}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    res.json({ data: response.data.main.temp });
  } catch (error) {
    res.status(500).json("Error retrieving Weather");
    console.log(error);
  }
};

export const getFood = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const trip = await Trip.findById(id);
    console.log(trip.exCode);
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${trip.nationality}`
    );
    const data = response.data.meals[0].strMeal;
    console.log(data);
    res.json({ data: response.data.meals[0].strMeal });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Food" });
    console.log(error);
  }
};

export const getCurrency = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const trip = await Trip.findById(id);
    console.log(trip.exCode);
    const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=${trip.exCode}_EGP&compact=ultra&apiKey=${process.env.CURRENCY_API_KEY}`);
    res.json(response.data[`${trip.exCode}_EGP`]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving exchange rate" });
    console.log(error);
  }
};
