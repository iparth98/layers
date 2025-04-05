import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/users.model.js";
import Roles from "../models/role.model.js";

const connection_string =
  "mongodb://127.0.0.1:27017/layers?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8";

async function seedUsers() {
  // connect to the database
  await mongoose.connect(`${connection_string}`);
  console.log("MongoDB Connected!");
  const get_roles = await Roles.find();

  const customer_role = get_roles.find((role) => role.name === "customer")?._id;
  const admin_role = get_roles.find((role) => role.name === "admin")?._id;
  const vendor_role = get_roles.find((role) => role.name === "vendor")?._id;
  const users = [
    {
      fname: "Admin",
      lname: "Raja",
      email: "admin@layers.ca",
      password: await bcrypt.hash("Admin@321", 10),
      role: admin_role,
    },
    {
      fname: "John",
      lname: "Doe",
      email: "vendor@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Jamie",
      lname: "Lannister",
      email: "lannister@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Arya",
      lname: "Stark",
      email: "arya@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Queen",
      lname: "Lannister",
      email: "queen@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Cercei",
      lname: "Lannister",
      email: "cercei@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Ned",
      lname: "Stark",
      email: "ned@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Brad",
      lname: "Stark",
      email: "brad@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "loli",
      lname: "Stark",
      email: "loli@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Alice",
      lname: "Johnson",
      email: "alice@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Bob",
      lname: "Smith",
      email: "bob@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Charlie",
      lname: "Brown",
      email: "charlie@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Diana",
      lname: "Evans",
      email: "diana@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Edward",
      lname: "Harris",
      email: "edward@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Fiona",
      lname: "Clark",
      email: "fiona@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "George",
      lname: "White",
      email: "george@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Hannah",
      lname: "Walker",
      email: "hannah@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Ian",
      lname: "Morris",
      email: "ian@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Julia",
      lname: "Taylor",
      email: "julia@layers.ca",
      password: await bcrypt.hash("Vendor@321", 10),
      role: vendor_role,
    },
    {
      fname: "Smith",
      lname: "Kennedy",
      email: "customer@layers.ca",
      password: await bcrypt.hash("Customer@321", 10),
      role: customer_role,
    },
  ];
  const insertUsers = await User.insertMany(users);
  const getAdmin = await User.findOne({ email: "admin@layers.ca" });
  const getVendor = await User.findOneAndUpdate(
    { email: "vendor@layers.ca" },
    { createdBy: getAdmin._id }
  );

  await mongoose.disconnect();
  console.log("Database connection is closed");
}

mongoose
  .connect(`${connection_string}`)
  .then(async () => {
    await seedUsers();
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
