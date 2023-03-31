import mongoose from "mongoose";

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
    imgSrc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    acMinPrice: {
      type: Number,
      required: true,
    },
    acMaxPrice: {
      type: Number,
      required: true,
    },
    flMinPrice: {
      type: Number,
      required: true,
    },
    flMaxPrice: {
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
