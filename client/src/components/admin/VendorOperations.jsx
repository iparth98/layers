import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { getVendors, activateVendor } from "../../services/api/users";
import Table from "../UI/Table";

const VendorOperations = () => {
  const [vendors, setVendors] = useState([]);
  const [totalVendors, setTotalVendors] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const latestRequest = useRef(null);

  const loadVendors = async () => {
    setIsLoading(true);
    const requestId = Date.now();
    latestRequest.current = requestId;

    try {
      const response = await getVendors(page, limit, search);
      if (latestRequest.current === requestId) {
        setVendors(response.data.vendors);
        setTotalVendors(response.data.totalVendors);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load vendors...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      loadVendors();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [page, search]);

  const markActiveHandler = async (vendorID, isActive) => {
    try {
      const updateVendor = await activateVendor({
        vendorID,
        active: !isActive,
      });

      if (updateVendor.data.status === "success") {
        toast.success(updateVendor.data.message);
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor._id === vendorID
              ? { ...vendor, isActive: !isActive }
              : vendor
          )
        );
      } else {
        toast.error(updateVendor.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update vendor status.");
    }
  };

  const searchChangeHandler = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  return (
    <div className="w-full flex flex-col items-start mb-3 mt-1 pl-3">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Vendor Operations
        </h3>
        <p className="text-slate-500">
          Manage vendor operations like editing details, activating vendors, and
          viewing details.
        </p>
      </div>

      {isLoading ? (
        <p className="text-center py-4">Loading vendors...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : vendors.length === 0 ? (
        <p className="text-center py-4">No vendors found.</p>
      ) : (
        <Table
        columns={[
            {
              header: "Name",
              key: "fname",
              render: (row) => `${row.fname} ${row.lname}`,
            },
            { header: "Email", key: "email" },
            {
              header: "Member Since",
              key: "createdAt",
              render: (row) => new Date(row.createdAt).toLocaleDateString(),
            },
            {
              header: "Active",
              key: "isActive",
              render: (row) => (
                <input
                  type="checkbox"
                  checked={row.isActive}
                  onChange={() => markActiveHandler(row._id, row.isActive)}
                  className="cursor-pointer"
                />
              ),
            },
          ]}
          data={vendors}
          totalData={totalVendors}
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

export default VendorOperations;
