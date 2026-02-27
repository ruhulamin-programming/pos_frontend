"use client";

import { useState } from "react";
import { useUsersQuery, useDeleteUserMutation } from "@/lib/services/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdPerson,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDelete,
  MdVisibility,
  MdPhone,
  MdMailOutline,
  MdMoreVert,
  MdOutlineReceipt,
  MdLocationOn,
} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: usersResponse, isLoading } = useUsersQuery({
    page: currentPage,
    limit: limit,
    search,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Mapping to the specific response structure provided
  const users = usersResponse?.data?.data || [];
  const meta = usersResponse?.data?.meta || {
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  const totalPages = meta.totalPages || 0;
  const totalCount = meta.totalCount || 0;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete user");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <ToastContainer />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <MdOutlineReceipt size={24} />
            </span>
            Users Management
          </h2>
          <p className="text-gray-400 text-xs mt-1 ml-11 font-medium">
            Manage your customers and clients
          </p>
        </div>
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Contact Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Address
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-10 w-10 rounded-full border-4 border-indigo-50 border-t-indigo-600 animate-spin"></div>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">
                        Retrieving data...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-gray-50 rounded-full">
                        <MdPerson size={48} className="text-gray-200" />
                      </div>
                      <p className="text-gray-500 font-bold text-lg">
                        No Users Found
                      </p>
                      <p className="text-gray-400 text-sm">
                        Try a different search term
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr
                    key={user?.id}
                    className="hover:bg-indigo-50/30 transition-all group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 relative overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-gray-100 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                          {user?.profileImage ? (
                            <Image
                              src={user.profileImage}
                              alt={user?.fullName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <MdPerson size={24} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                            {user?.fullName}
                          </p>
                          <p className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded inline-block">
                            #{user?.id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                          <MdPhone className="text-indigo-400" size={16} />
                          <span>{user?.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MdMailOutline size={14} />
                          <span className="truncate max-w-45">
                            {user?.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MdLocationOn className="text-rose-400" size={16} />
                        <span className="line-clamp-1">
                          {user?.address || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                        <Link
                          href={`/admin/users/${user?.id}`}
                          className="p-2.5 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300"
                        >
                          <MdVisibility size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(user?.id)}
                          disabled={isDeleting}
                          className="p-2.5 bg-white hover:bg-rose-600 text-rose-500 hover:text-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                      <div className="group-hover:hidden transition-all text-gray-300">
                        <MdMoreVert size={20} className="inline" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Container */}
      {!isLoading && users.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
            Displaying{" "}
            <span className="text-indigo-600">
              {totalCount > 0 ? (currentPage - 1) * limit + 1 : 0}-
              {Math.min(currentPage * limit, totalCount)}
            </span>{" "}
            of <span className="text-gray-900">{totalCount}</span> entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border-2 transition-all font-bold text-[10px] uppercase tracking-widest ${
                currentPage === 1
                  ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                  : "bg-white text-indigo-600 border-indigo-50 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm"
              }`}
            >
              <MdKeyboardArrowLeft size={16} />
              Prev
            </button>

            <div className="hidden md:flex items-center gap-1">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all border-2 ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100"
                          : "bg-white text-gray-400 border-transparent hover:border-gray-100 hover:text-gray-900"
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
                    <span
                      key={pageNum}
                      className="text-gray-300 px-1 font-bold"
                    >
                      ·
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border-2 transition-all font-bold text-[10px] uppercase tracking-widest ${
                currentPage >= totalPages
                  ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                  : "bg-white text-indigo-600 border-indigo-50 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm"
              }`}
            >
              Next
              <MdKeyboardArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
