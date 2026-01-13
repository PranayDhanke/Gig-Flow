import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv()

const jwt_secret = process.env.JWT_SECRET as string;
export const generateToken = (userId : string) => {
  return jwt.sign(
    {
      userId,
    },
    jwt_secret,
    { expiresIn: "7d" }
  );
};
