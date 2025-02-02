import express from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../controllers/productController.js";
import validateVendorHandler from "../middleware/validateVendorHandler.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", [validateVendorHandler, uploadImage], createProduct);
router.put("/:id", [validateVendorHandler, uploadImage], updateProduct);
router.delete("/:id", validateVendorHandler, deleteProduct);

export default router;
