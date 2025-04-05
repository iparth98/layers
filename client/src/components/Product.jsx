import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { updateCart as updateCartApi } from "../services/api/cartApi";

export const Product = ({ products }) => {
  const addToCartHandler = async (productId, quantity) => {
    const addToCart = await updateCartApi(productId, quantity);
    if (addToCart.data.status === "success") {
      toast.success(addToCart.data.message);
    } else {
      toast.error(addToCart.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-5">
      {/* Grid Layout for products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.products.map((product) => (
          <div
            key={product._id}
            className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <Link to={`/${product._id}`} key={product._id}>
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img src={product.image} alt="image not found" />
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-2">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h2>

                {/* Price Section */}
                <div className="flex items-center gap-2">
                  {product.discountedPrice > 0 ? (
                    <div>
                      <span className="text-xl font-bold text-red-600">
                        ${product.discountedPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl text-gray-600">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCartHandler(product._id, 1)}
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
