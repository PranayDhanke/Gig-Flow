import { Request, Response } from "express";
import Bid from "../models/Bids.model";

export const createBid = async (req: Request, res: Response) => {
  const data = req.body;
  const bid = await Bid.create({
    ...data,
  });
  res.status(201).json(bid);
};

export const getBids = async (req: Request, res: Response) => {
  const bids = await Bid.find({ "freelancer._id": req.params.id });
  res.status(201).json(bids);
};

export const getBidsforGig = async (req: Request, res: Response) => {
  const bids = await Bid.find({ gigId: req.params.id });
  res.status(201).json(bids);
};

