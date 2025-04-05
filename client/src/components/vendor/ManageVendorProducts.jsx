import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { getVendorProducts } from "../../services/api/users";
import Table from "../UI/Table";

const ManageVendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const latestRequest = useRef(null);

  const loadVendorProducts = async () => {
    setIsLoading(true);
    const requestId = Date.now();
    latestRequest.current = requestId;

    const user = JSON.parse(localStorage.getItem("user"));
    const vendorId = user?._id;

    if (!vendorId) {
      setError("Vendor ID not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await getVendorProducts(vendorId, page, limit, search);

      if (latestRequest.current === requestId) {
        setProducts(response.data.products || []);
        setTotalProducts(response.data.totalProducts || 0);
        setTotalPage(response.data.totalPages || 1);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load vendor products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      loadVendorProducts();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [page, search]);

  const searchChangeHandler = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const columns = [
    { header: "ID", key: "_id" },
    { header: "Title", key: "title" },
    { header: "Quantity", key: "quantity" },
    { header: "Price ($)", key: "price" },
    { header: "Discounted Price ($)", key: "discountedPrice" },
    {
      header: "Action",
      key: "action",
      render: (row) => (
        <NavLink
          to={`/vendor/product/${row._id}/edit`}
          className="text-blue-600 hover:underline"
          state={{ product: row }}
        >
          Edit
        </NavLink>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-start mb-3 mt-1 pl-3">
      <h3 className="text-lg font-semibold text-slate-800">
        Manage Vendor Products
      </h3>
      <p className="text-slate-500">
        View and manage products listed by the vendor.
      </p>
      <NavLink
        to="/vendor/product"
        className="mt-4 border border-solid rounded-xl bg-white text-black p-2 w-40 flex items-center justify-center hover:bg-black hover:text-white"
      >
        Add Products
      </NavLink>

      {isLoading ? (
        <p className="text-center py-4">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center py-4">No products found.</p>
      ) : (
        <Table
          columns={columns}
          data={products}
          totalData={totalProducts}
          page={page}
          setPage={setPage}
          limit={limit}
          totalPages={totalPages}
          search={search}
          onSearchChange={searchChangeHandler}
        />
      )}
    </div>
  );
};

export default ManageVendorProducts;
