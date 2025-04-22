import { Link } from "react-router-dom";
import home_image_air_2 from "../../assets/home/home_image_air_2.png";

export const Product = (products) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 ml-2 pr-3">
      {products.products.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id}>
          <div key={product._id} className="w-full pb-7">
            {/* Image Container */}
            <div className="h-96 w-full">
              <img
                src={product.image}
                alt="Image Not Found"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="mt-2 text-left">
              <span className="text-sm pb-1 block">{product.title}</span>
              <div className="flex items-center gap-2">
                {product.discountedPrice > 0 ? (
                  <div>
                    <span className="text-sm font-bold text-red-600">
                      ${product.discountedPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-600">
                    ${product.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Product;
