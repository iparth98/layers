import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../../services/api/productsApi";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]); // Stores all loaded products
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit to 10
  const [totalProducts, setTotalProducts] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadProducts(1, true); // ✅ Load only first page on mount
  }, []);

  const loadProducts = async (pageNumber, isFirstLoad = false) => {
    try {
      if (pageNumber > totalPages) return; // ✅ Prevent extra API calls

      setLoadingMore(true);
      const response = await getProducts(pageNumber);

      setPage(response.page);
      setLimit(response.limit);
      setTotalProducts(response.totalProducts);
      setTotalPages(response.totalPages);

      // ✅ If first load, replace products. Otherwise, append.
      if (isFirstLoad) {
        setProducts(response.products);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...response.products]);
      }
    } catch (err) {
      toast.error("Failed to load products");
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreHandler = () => {
    if (page < totalPages) {
      loadProducts(page + 1); // ✅ Load next page on click
    }
  };

  return (
    <div className="w-full mt-4 items-center flex flex-col">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <Product products={products} />
          
          {/* ✅ Show Load More button only if more products exist */}
          {page < totalPages && (
            <button
              onClick={loadMoreHandler}
              className="mt-4 text-black px-6 py-2 rounded-md border border-black hover:bg-black hover:text-white"
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          )}

          {/* ✅ Showing product count */}
          <div>
            <p className="mt-5 text-sm font-bold">
              Showing {products.length} of {totalProducts} products
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
