import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import { toast } from "react-toastify";
import { getProduct } from "../../services/api/productsApi";

const ProductDetail = () => {
  const { addToCartHandler } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  const getProductData = async () => {
    if (!productId) return;
    try {
      const getProd = await getProduct(productId);
      setProduct(getProd);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    const { status, message } = await addToCartHandler(productId, quantity);
    if (status === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    getProductData();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full p-4 gap-8">
      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt="Product"
          className="w-full h-auto max-h-[600px] object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="px-6">
        <h1 className="text-2xl font-semibold uppercase leading-snug tracking-wide">
          {product.title}
        </h1>
        <h6 className="text-gray-600 text-xs pb-2">SKU: {product._id}</h6>
        <h6 className="text-gray-600 text-xs font-semibold pb-6">
          Sold and shipped by{" "}
          <Link to={`/vendor/${product?.user_id?._id}`}>
            <span className="underline italic text-blue-500">
              {product?.user_id?.fname} {product?.user_id?.lname}
            </span>
          </Link>
        </h6>

        {/* Price Section */}
        {product.discountedPrice > 0 ? (
          <div className="flex items-center space-x-3">
            <span className="text-xl font-semibold text-red-600">
              ${product.discountedPrice}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${product.price}
            </span>
          </div>
        ) : (
          <span className="text-xl text-gray-600">${product.price}</span>
        )}

        {/* Product Description */}
        <p className="text-gray-600 text-sm leading-relaxed tracking-normal">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button
          className="bg-black text-white w-full h-14 uppercase mt-10 hover:bg-white hover:text-black hover:border border-black transition text-sm"
          onClick={() => addToCart(product._id, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
