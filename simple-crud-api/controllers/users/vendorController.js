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
    const vendorRole = await Roles.findOne({ name: "vendor" });
    const vendors = await User.find(
      { role: vendorRole._id },
      { name: 1, fname: 1, lname: 1, email: 1 }
    ).populate("role", { _id: 0, name: 1 });
    res.status(200).json(vendors);
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
    const { ids } = req.body;
    const isActive = req.body.isActive;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "invalid vendor ID" });
    }

    const activateVendor = await User.updateMany(
      { _id: { $in: ids } },
      { $set: { isActive: isActive } },
      { runValidators: true }
    );

    return res
      .status(200)
      .json({ message: `${isActive ? "Activated" : "Disabled"}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getvendorProducts = async (req, res) => {
  try {
    const vendorId = req.params.id;
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // calculate no of documents to skip
    const skip = (page - 1) * limit;
    console.log(skip);

    console.log(vendorId);
    const products = await Product.find({ user_id: vendorId })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments({ user_id: vendorId });
    console.log(totalProducts);
    

    return res
      .status(200)
      .json({
        success: true,
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        products: products,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
