import { Request, Response } from "express";
import User from "../models/Auth.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body.data;

  const alreadyExist = await User.findOne({ email });

  if (alreadyExist) {
    return res.status(401).json({ message: "User Already Exists" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  console.log("hashedpass ", hashedPass);

  const user = await User.create({
    name,
    email,
    role,
    password: hashedPass,
  });

  const token = generateToken(user._id.toString());

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
    maxAge: 7 * 24 * 60 * 1000,
    priority: "high",
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body.data;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ messsage: "user not found" });
  }

  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = generateToken(user._id.toString());

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    priority: "high",
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const getMe = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(401).json({ messsage: "user not found" });
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const logoutUser = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });

  res.status(200).json({ message: "logged out successfully" });
};
