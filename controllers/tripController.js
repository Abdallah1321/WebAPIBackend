import Trip from "../models/Trip.js";

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
  try {
  } catch (err) {}
};

//Get all trip details

export const getAllTrips = async (req, res) => {
  try {
  } catch (err) {}
};
