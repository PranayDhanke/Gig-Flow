import mongoose from "mongoose";

const gigsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: String, required: true },
    status: { type: String, enum: ["open", "assigned"], required: true },
    postedBy: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gigs", gigsSchema);
