import { Request, Response } from "express";
import Gig from "../models/Gigs.model";

export const createGig = async (req: Request, res: Response) => {
  const data = req.body;
  const gig = await Gig.create({
    ...data,
  });
  res.status(201).json(gig);
};

export const getGig = async (_req: Request, res: Response) => {
  const gigs = await Gig.find();
  res.status(201).json(gigs);
};

export const getGigbyId = async (req: Request, res: Response) => {
  const gig = await Gig.findById(req.params.id);
  res.status(201).json(gig);
};

export const myGigs = async (req: Request, res: Response) => {
  const gigs = await Gig.find({ "postedBy._id": req.params.id });
  res.status(201).json(gigs);
};
