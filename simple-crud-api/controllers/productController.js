import multer from "multer";
import path from "path";
import Product from "../models/product.model.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png/;
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedExtensions.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only images (JPEG, PNG, GIF) are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export const createProduct = async (req, res) => {
  try {
    const { title, description, quantity, price, discountedPrice } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const fullImageUrl = `${req.protocol}://${req.get("host")}${imageUrl}`;

    const product = new Product({
      title,
      price,
      quantity,
      discountedPrice,
      description,
      image: fullImageUrl,
      user_id: req.user.id,
    });

    await product.validate();
    await product.save();
    res.status(201).json({ message: "Product created", data: product });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }

    res.status(500).json({ message: error.message });
  }
};
export const uploadImage = upload.single("image");

export const getProducts = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // calculate no of products to skip
    const skip = (page - 1) * limit;

    const products = await Product.find({}).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments({});
    res
      .status(200)
      .json({
        success: true,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products: products,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id.trim()).populate("user_id", {
      _id: 1,
      fname: 1,
      lname: 1,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let updatedProduct = { ...req.body };
    if (req.file) {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const fullImageUrl = `${req.protocol}://${req.get("host")}${imageUrl}`;
      updatedProduct.image = fullImageUrl;
    }
    console.log("Step 1");

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updatedProduct },
      { new: true, runValidators: true }
    );
    console.log("Step 2");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product Updated Successfully", data: product });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    }
    res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      // If no product is found to delete
      return res.status(404).json({ message: "Product not found" });
    }

    // If product is successfully deleted
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // General server error
    res.status(500).json({
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
};
