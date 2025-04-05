import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/users.model.js";

export const AddToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const effectivePrice =
      product.discountedPrice > 0 ? product.discountedPrice : product.price;

    let cart = await Cart.findOne({
      userId: req.user.id,
      isOrderPlaced: false,
    });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        products: [{ productId: product._id, quantity, price: effectivePrice }],
        totalPrice: effectivePrice * quantity,
      });
    } else {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;

        if (existingProduct.quantity <= 0) {
          // Remove product if quantity is zero or negative
          cart.products = cart.products.filter(
            (item) => item.productId.toString() !== productId
          );
        }
      } else if (quantity > 0) {
        // Only add new product if quantity is positive
        cart.products.push({
          productId: product._id,
          quantity,
          price: effectivePrice,
        });
      }

      // Recalculate total price
      cart.totalPrice = cart.products.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
    }

    await cart.save();
    res.status(200).json({ status: "success", message: "Added to cart", data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cart = async (req, res) => {
  try {
    const cart = await Cart.findOne(
      {
        userId: req.user.id,
        isOrderPlaced: false,
      },
      { __v: 0, createdAt: 0, updatedAt: 0, userId: 0, _id: 0 }
    ).populate("products.productId", { _id: 1, title: 1 });

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
