import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVendorProducts } from "../services/api/productsApi";
import Product from "./product/Product";

const Products = () => {
  const [products, setPrducts] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { vendorId } = useParams();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getVendorProducts(vendorId);

        setPrducts(products.products);
        setVendor(products.getVendor);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [vendorId]);

  return (
    <div className="container w-full p-14">
      <div>
        <h1 className="text-2xl font-semibold uppercase leading-snug tracking-wide">
          {vendor?.fname} {vendor?.lname}
        </h1>
        <span className="italic text-blue-700 text-sm">{vendor?.email}</span>
        <p className="mt-6 pb-6 text-gray-600 text-sm leading-relaxed tracking-normal w-[800px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi et
          quisquam, corrupti sed, explicabo temporibus molestiae ducimus laborum
          vel optio error sint cum sunt repudiandae ipsam consequatur ipsum
          quidem esse.
        </p>
        <hr />
      </div>
      <div className="w-full mt-4 items-center flex flex-col">
        <Product products={products} />
      </div>
    </div>
  );
};
export default Products;
