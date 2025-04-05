import validator from "validator";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email address already exists"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v); // This covers the email validation
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
