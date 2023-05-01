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
    budget: {
      type: Number,
      required: true,
    },
    exCode: {
      type: String,
      required: true,
    },
    activities: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
