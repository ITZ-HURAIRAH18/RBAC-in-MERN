import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .populate({
        path: "roles",
        populate: { path: "permissions" }
      });

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const can = (permission) => {
  return (req, res, next) => {
    const permissions = req.user.roles.flatMap(r =>
      r.permissions.map(p => p.name)
    );

    if (!permissions.includes(permission))
      return res.status(403).json({ message: "Forbidden: You don't have permission" });

    next();
  };
};