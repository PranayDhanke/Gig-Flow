import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./router/Auth.routes";
import gigRoute from "./router/Gig.routes";
import bidRoute from "./router/Bid.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

let corsOptions = {
  origin: "https://gig-flow-lovat-two.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/gig", gigRoute);
app.use("/api/bid", bidRoute);

export default app;
