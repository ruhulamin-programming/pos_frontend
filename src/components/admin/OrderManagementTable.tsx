"use client";

import { useGetOrdersQuery } from "@/lib/services/orderApi";
import { useState } from "react";
import {
  MdOutlineReceipt,
  MdDateRange,
  MdCategory,
  MdFastfood,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

interface OrderItem {
  id: string;
  quantity: number;
  total: number;
  subTotal: number;
  createdAt: string;
  order: {
    id: string;
    status: string;
    transactionId: string;
  };
  product: {
    id: string;
    productName: string;
    productImage: string;
    category: {
      id: string;
      categoryName: string;
    };
  };
}

const OrderManagementTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [menu, setMenu] = useState("");

  const {
    data: ordersResponse,
    isLoading,
    isError,
  } = useGetOrdersQuery({
    page: currentPage,
    limit,
    menu,
  });

  const orders = ordersResponse?.data?.data || [];
  const meta = ordersResponse?.data?.meta || {
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  const totalPages = meta.totalPages || 0;
  const totalCount = meta.totalCount || 0;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Loading orders...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 px-4 bg-red-50 rounded-xl border border-red-100 max-w-2xl mx-auto my-8">
        <div className="text-red-500 text-4xl mb-4 text-center">⚠️</div>
        <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
        <p className="text-red-600 mt-1">
          Failed to load orders. Please check your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <MdOutlineReceipt size={24} />
          </span>
          Order List
        </h2>
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products or order IDs..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
            value={menu}
            onChange={(e) => {
              setMenu(e.target.value);
              setCurrentPage(1); // Reset to page 1 on menu change
            }}
          />
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm ring-1 ring-gray-900/5">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date & Info
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((item: OrderItem) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/80 transition-all duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-200">
                        {item.product.productImage ? (
                          <img
                            src={item.product.productImage}
                            alt={item.product.productName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <MdFastfood size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {item.product.productName}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                          <MdCategory className="text-indigo-400" />
                          {item.product.category?.categoryName ||
                            "Uncategorized"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                        <MdDateRange className="text-gray-400" />
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tight">
                        #{item.id.slice(-8)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      ${item.subTotal.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-gray-400">Exc. Tax</div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-16 text-center bg-gray-50/50"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-4 bg-white rounded-full shadow-sm">
                        <MdSearch size={40} className="text-gray-300" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-gray-900 font-semibold">
                          No results found
                        </h3>
                        <p className="text-gray-500 text-sm">
                          We couldn't find any orders matching your search.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {totalCount > 0 ? (currentPage - 1) * limit + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900">
            {Math.min(currentPage * limit, totalCount)}
          </span>{" "}
          of <span className="font-semibold text-gray-900">{totalCount}</span>{" "}
          entries
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
              currentPage === 1
                ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 shadow-sm"
            }`}
          >
            <MdKeyboardArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-1 mx-1">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              // Show pages around current, or first/last
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-10 h-10 px-3 py-1 rounded-lg text-sm font-medium transition-all border ${
                      currentPage === pageNum
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <span key={pageNum} className="px-1 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
              currentPage >= totalPages
                ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 shadow-sm"
            }`}
          >
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>

        {/* Limit Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">
            Items per page:
          </span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-gray-400 transition"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementTable;
