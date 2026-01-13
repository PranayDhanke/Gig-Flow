import { Router } from "express";
import {
  createGig,
  getGig,
  getGigbyId,
  myGigs,
} from "../controllers/Gigs.controller";
import { protect } from "../middlewares/Auth.middleware";

const router = Router();

router.post("/create-gig", protect, createGig);
router.get("/get-gig/:id", getGigbyId);
router.get("/gigs", getGig);
router.get("/get-my-gigs/:id", protect, myGigs);

export default router;
