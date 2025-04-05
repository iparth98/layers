import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import Role from "../models/role.model.js";
import { generateJwtToken } from "../middleware/authenticateHandler.js";

export const signup = async (req, res) => {
  try {
    const { fname, lname, email, password, confirmPassword } = req.body;

    // Check required fields
    if (!fname || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "All fields are required!",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "User with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get customer role
    const customerRole = await Role.findOne({ name: "customer" });
    if (!customerRole) {
      return res.status(500).json({
        status: "error",
        data: null,
        message: "Customer role not found. Please contact support.",
      });
    }

    // Create user
    const user = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: customerRole,
    });

    // Generate JWT token
    const accessToken = await generateJwtToken(user);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: accessToken,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    // Handle all other errors
    res.status(500).json({
      status: "error",
      data: null,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Email and password are required.",
      });
    }

    // Find user
    const user = await User.findOne({ email }).populate("role", {
      _id: 0,
      name: 1,
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", data: null, message: "User not found." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", data: null, message: "Invalid credentials." });
    }

    // Generate access token
    const accessToken = generateJwtToken(user);
    console.log(accessToken);

    res.status(200).json({
      status: "success",
      data: { accessToken, role: user.role },
      message: "Sign in successful!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -createdBy -updatedBy -createdAt -updatedAt -__v")
      .populate("role", "-_id -__v")
      .lean();
    console.log(user);
    res
      .status(200)
      .json({ status: true, user, message: "User fetch successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
};
