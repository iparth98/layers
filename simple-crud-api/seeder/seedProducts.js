import mongoose from "mongoose";
import User from "../models/users.model.js";
import Product from "../models/product.model.js";
import Role from "../models/role.model.js";

const connection_string =
  "mongodb://127.0.0.1:27017/layers?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8";

async function seedProducts() {
  console.log("MongoDB Connected!");
  const vendorRoleId = await Role.find({ name: "vendor" });
  const vendors = await User.find({ role: vendorRoleId });
  console.log(vendors);
  

  const PRODUCTS = [
    {
      "title": "Lounge Tee",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 25.99,
      "discountedPrice": 19.99,
      "quantity": 45,
      "user_id" : vendors[0]._id
    },
    {
      "title": "Ribbed Tank (5-pack Multi)",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 34.99,
      "discountedPrice": 24.99,
      "quantity": 25,
      "user_id" : vendors[1]._id
    },
    {
      "title": "Circuit Jogger",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 35.99,
      "discountedPrice": 24.99,
      "quantity": 35,
      "user_id" : vendors[0]._id,
    },
    {
      "title": "Alpha Hoodie",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 27.99,
      "quantity": 20,
      "user_id" : vendors[1]._id
    },
    {
      "title": "Circuit Tee 2.0",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 12.99,
      "quantity": 22,
      "user_id" : vendors[0]._id
    },
    {
      "title": "Alpha Hoodie 2",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 27.99,
      "quantity": 20,
      "user_id" : vendors[1]._id
    },
    {
      "title": "Long Sleeve Training Top",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 25.99,
      "quantity": 60,
      "user_id" : vendors[0]._id
    },
    {
      "title": "Tech Hoodie",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 28.99,
      "quantity": 20,
      "user_id" : vendors[1]._id
    },
    {
      "title": "VIP Pant",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 99.99,
      "quantity": 5,
      "user_id" : vendors[1]._id
    },
    {
      "title": "Versatility Pant",
      "description": " lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      "price": 19.99,
      "quantity": 30,
      "user_id" : vendors[1]._id
    }
  ];
  const products = await Product.insertMany(PRODUCTS);
  
}
mongoose
  .connect(`${connection_string}`)
  .then(async () => {
    await seedProducts();
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log("Error connecting to Mongoose", err);
  });
