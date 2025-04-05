import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

const validateVendorHandler = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization; // Fix: Corrected auth header extraction
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "User authentication is required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);    
    // Fetch the user with the role populated
    const checkvendor = await User.findById(decoded.user.id).populate("role");

    if (!checkvendor || checkvendor.role.name !== "vendor") {
      return res.status(403).json({ message: "Access denied. Vendor only." });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default validateVendorHandler;
