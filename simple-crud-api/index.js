import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";

import error from "./middleware/error.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import products from "./routes/products.js"
import users from "./routes/users.js";
import orders from "./routes/orders.js";

const port = process.env.PORT || 8080;
const connection_string = process.env.CONNECTION_STRING || "";
const app = express();

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cors());
// middleware
app.use(express.json());
app.use(logger);

// routes
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api", orders);

app.use(notFound);
app.use(error);

// running services
app.listen(port, () => console.log(`listening on ${port}`));

// database connection
mongoose
  .connect(`${connection_string}`)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));
