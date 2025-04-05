import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlegth: [4, "Title is too short"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description should not exceed 500 characters"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      default: 9999.0,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: "Price cannot be negative",
      },
    },
    discountedPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
