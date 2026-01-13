import { Router } from "express";
import { loginUser, registerUser, getMe, logoutUser } from "../controllers/Auth.controller";
import { protect } from "../middlewares/Auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getMe", protect , getMe);
router.post("/logout" , logoutUser)

export default router;
