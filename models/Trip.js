import mongoose from "mongoose";

//create trip schema
const tripSchema = new mongoose.Schema(
  {
    destName: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    accomodation: {
      type: Number,
      required: true,
    },
    flights: {
      type: Number,
      required: true,
    },
    transport: {
      type: Number,
      required: true,
    },
    meals: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    exCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
