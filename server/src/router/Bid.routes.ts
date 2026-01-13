import { Router } from "express";
import {
  createBid,
  getBids,
  getBidsforGig,
} from "../controllers/Bids.controller";
import { protect } from "../middlewares/Auth.middleware";
import { hireFreelancer } from "../controllers/hire.controller";

const router = Router();

router.post("/create-bid", protect, createBid);
router.get("/get-bid/:id", protect, getBids);
router.get("/get-bid-gig/:id", protect, getBidsforGig);
router.patch("/hire-freelancer/:id", protect , hireFreelancer);

export default router;
