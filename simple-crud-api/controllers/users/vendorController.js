import bcrypt from "bcrypt";
import User from "../../models/users.model.js";
import Product from "../../models/product.model.js";
import Roles from "../../models/role.model.js";

export const createVendor = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).json({ message: "User with email already exists" });
  }

  const vendorRole = await Roles.findOne({ name: "vendor" });

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
    role: vendorRole,
    createdBy: req.user.id,
  });

  res.status(201).json({ message: "User created successfully", data: "da" });
};

export const getVendors = async (req, res) => {
  try {
    let { page, limit, search = "" } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // calculate no of products to skip
    const skip = (page - 1) * limit;

    const vendorRole = await Roles.findOne({ name: "vendor" });
    const filter = {
      role: vendorRole._id,
      $or: [
        { fname: { $regex: search, $options: "i" } }, // Case-insensitive search
        { lname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const vendors = await User.find(filter)
      .select("fname lname email isActive createdAt")
      .populate("role", "name")
      .skip(skip)
      .limit(limit);

    const totalVendors = await User.countDocuments(filter);
    res.status(200).json({
      status: true,
      message: "Vendors fetch successfully",
      totalVendors,
      page,
      limit,
      totalPages: Math.ceil(totalVendors / limit),
      vendors: vendors,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const body = { ...req.body, updatedBy: req.user.id };

    // Run validation during update
    const getVendor = await User.findByIdAndUpdate(req.params.id, body, {
      new: true, // return the updated document
      runValidators: true, // ensure validators are run during update
    });

    if (!getVendor) {
      return res.status(404).json({ message: "Vendor not Updated" });
    }

    // Fetch updated vendor after update
    const getUpdatedVendor = await User.findById({ _id: req.params.id })
      .populate("updatedBy", { fname: 1, lname: 1, email: 1 })
      .populate("role", { name: 1 });

    return res.status(200).json({ message: getUpdatedVendor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const activateVendor = async (req, res) => {
  try {
    const { vendorID, active } = req.body;
    console.log(req.body);
    

    const activateVendor = await User.findOneAndUpdate(
      { _id: vendorID },
      { $set: { isActive: active } },
      { runValidators: true }
    );

    return res
      .status(200)
      .json({ status: "success", data: null, message: "User updated" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", data: error, message: error.message });
  }
};

export const getvendorProducts = async (req, res) => {
  try {
    const vendorId = req.params.id;
    console.log(vendorId.trim());

    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // calculate no of documents to skip
    const skip = (page - 1) * limit;

    const getVendor = await User.findById(vendorId.trim())
      .select("-password -createdBy -updatedBy -createdAt -updatedAt -__v -role")
      .lean();

    const products = await Product.find({ user_id: vendorId.trim() })
      .select("-__v -user_id")
      .lean()
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments({ user_id: vendorId });

    return res.status(200).json({
      success: true,
      page,
      limit,
      getVendor,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products: products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
