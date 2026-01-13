import { Request, Response } from "express";
import mongoose from "mongoose";
import Gig from "../models/Gigs.model";
import Bid from "../models/Bids.model";
import { notifyHiredFreelancer } from "./socket.controller";

export const hireFreelancer = async (req: Request, res: Response) => {
  const bidId = req.params.id;

  console.log("i came here ");

  console.log(bidId);

  const session = await mongoose.startSession();

  session.startTransaction();

  console.log("start trsna ");

  try {
    const bid = await Bid.findById(bidId).session(session);

    console.log(bid);

    if (!bid) {
      throw new Error("there is no bid");
    }

    const gig = await Gig.findById(bid.gigId).session(session);

    if (!gig) {
      throw new Error("there is no gig");
    }

    if (gig.status === "assigned") {
      throw new Error("freelancer already hired");
    }

    const gigid = gig._id;
    const freelancerId = bid.freelancer?._id;

    gig.status = "assigned";
    await gig.save({ session });

    bid.status = "hired";
    await bid.save({ session });

    await Bid.updateMany(
      {
        gigId: gigid,
        "freelancer._id": { $ne: freelancerId },
      },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    notifyHiredFreelancer(gig, freelancerId);

    res.status(201).json({ message: "Freelancer hired successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(401).json({ message: "Error while hiring" });
  }
};
