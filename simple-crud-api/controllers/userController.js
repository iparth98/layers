import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const signup = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  if (!fname || !email || !password) {
    return res
      .status(400)
      .json({ message: "First Name, email and password is required" });
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).json({ message: "User with email already exists" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created successfully", data: user });
};

export const login = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password is required" });
  }
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};

export const currentUser = async (req, res) => {
  res.status(200).json({ message: req.user });
};