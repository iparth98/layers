import mongoose from "mongoose";
import User from "../models/users.model.js";
import Roles from "../models/role.model.js";

const connection_string = "mongodb://127.0.0.1:27017/layers?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8";

const roles = [{ name: "admin" }, { name: "vendor" }, { name: "customer" }];

async function seedUsers() {
  // connect to the database
  await mongoose.connect(`${connection_string}`);
  console.log("MongoDB Connected!");
  const addRoles = await Roles.create(roles);
  const getRoles = Roles.find({});

  // Close the database connection
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
