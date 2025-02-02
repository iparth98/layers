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
  const customer_role = get_roles[0]._id;
  const admin_role = get_roles[1]._id;
  const vendor_role = get_roles[2]._id;

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
