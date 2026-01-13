import mongoose from "mongoose";

const bidsSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "hired", "rejected"],
      required: true,
    },
    freelancer: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bigs", bidsSchema);
