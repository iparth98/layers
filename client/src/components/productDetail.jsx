import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api/productsApi";

const ProductDetail = () => {
  const [product, setProduct] = useState(null); // Use `null` instead of an empty array for a single product
  const { productId } = useParams(); // Destructure `productId` directly

  useEffect(() => {
    const getProductData = async () => {
      if (!productId) return; // Prevent calling API if `productId` is undefined
      try {
        const getProd = await getProduct(productId);
        setProduct(getProd);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProductData();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.$numberDecimal}</p>
      <Link to={`/vendor/${product.user_id._id}`}>{product.user_id.fname} {product.user_id.lname}</Link>
    </div>
  );
};

export default ProductDetail;
