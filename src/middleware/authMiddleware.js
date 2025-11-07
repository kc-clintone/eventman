import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) throw new Error("User not found");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const organizerOnly = (req, res, next) => {
  if (req.user?.role !== "organizer") {
    return res.status(403).json({ message: "Organizer access only" });
  }
  next();
};

