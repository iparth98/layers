const Table = ({
  columns = [], // Array of column configurations
  data,
  totalData,
  page,
  setPage,
  limit,
  totalPages,
  search,
  onSearchChange,
}) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-x-auto mt-2">
      {/* Search Bar */}
      <div className="ml-3 flex justify-end">
        <div className="relative max-w-sm w-full">
          <input
            className="w-full pr-11 h-10 pl-3 py-2 text-sm text-slate-700 border border-slate-200 rounded placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Search..."
            value={search}
            onChange={onSearchChange}
          />
          <button className="absolute right-1 top-1 px-2 flex items-center bg-white rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-6 h-6 text-slate-600 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {columns.map((col, index) => (
              <th key={index} className="p-4">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              className="hover:bg-slate-50 border-b border-slate-200"
              key={row._id}
            >
              {columns.map((col, index) => (
                <td key={index} className="p-4">
                  {col.render ? col.render(row) : row[col.key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-slate-500">
          Showing{" "}
          <b>
            {(page - 1) * limit + 1}-{Math.min(page * limit, totalData)}
          </b>{" "}
          of {totalData}
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded transition duration-200 ${
              page === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
            aria-label="Previous Page"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded transition duration-200 ${
                page === i + 1
                  ? "bg-slate-800 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded transition duration-200 ${
              page === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
