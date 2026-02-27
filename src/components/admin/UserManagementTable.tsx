"use client";
import { useDeleteUserMutation, useUsersQuery } from "@/lib/services/userApi";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface User {
  id: string;
  username: string;
  phoneNo: string;
  activePlan: boolean;
  lastOrder: string;
  profileImage: string;
}

const UserManagementTable = () => {
  const [page, setPage] = useState(1);
  const { data: users, isLoading } = useUsersQuery({ page });
  const totalPages = users?.result?.totalPages;
  const [userDeleteFn, { error: deleteError }] = useDeleteUserMutation();

  const handleDelete = async (userId: string) => {
    try {
      const response = await userDeleteFn(userId);
      if (response.data.success === true) {
        toast.success("user has been deleted successfull");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error: any) {
      if (
        deleteError &&
        "data" in deleteError &&
        typeof deleteError.data === "object" &&
        deleteError.data !== null &&
        "message" in deleteError.data
      ) {
        toast.error((deleteError.data as { message?: string }).message);
      }
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Management
        </h2>
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-center">Getting users...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
                  >
                    Cashier Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-start text-sm font-medium text-gray-500"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-center text-sm font-medium text-gray-500 w-[15%]"
                  >
                    User Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users?.result?.users.map((user: User) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-2 text-sm text-gray-500 flex gap-2 items-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          width={20}
                          height={20}
                          className="h-full w-full object-cover"
                          src={user?.profileImage}
                          alt={user?.username}
                        />
                      </div>
                      <div className="text-[#3F3D56] font-medium">
                        {user.username}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 text-sm text-[#3F3D56] font-medium">
                      {user.phoneNo}
                    </td>
                    <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] font-medium">
                      {user.activePlan === true ? "Yes" : "Paused"}
                    </td>
                    <td className="whitespace-nowrap  py-3 text-sm text-[#3F3D56] font-medium">
                      {user.lastOrder ?? "23/12/2024"}
                    </td>
                    <td className="whitespace-nowrap  py-3 text-sm text-gray-500 flex justify-center items-center gap-4">
                      <Link href={`/admin/users/${user.id}`}>
                        <button className="cursor-pointer inline-flex gap-2 items-center justify-center rounded-md border border-gray-300 bg-[#FFF7E8] px-2.5 py-2 text-xs font-medium text-[#63B883] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <Edit size={20} /> Edit
                        </button>
                      </Link>
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => handleDelete(user?.id)}
                          type="button"
                          className="inline-flex gap-1 items-center justify-center rounded-md border border-transparent bg-[#FFEDED] px-2.5 py-2.5 text-xs font-medium text-[#FE4D4F] shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          aria-controls={`alert-dialog-content-${user.id}`}
                          aria-describedby={`alert-dialog-description-${user.id}`}
                        >
                          <Trash size={20} /> Delete User
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        {/* Previous button */}
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className={`inline-flex items-center justify-center rounded-md border border-gray-300 bg-[#63B88333] px-2.5 py-1.5 text-xs font-medium ${
            page === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#63B883] hover:bg-gray-50"
          } shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Page buttons */}
        {[page, page + 1, page + 2].map((pg) =>
          pg <= totalPages ? (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-xs font-medium shadow-sm ${
                pg === page
                  ? "bg-[#63B883] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {pg}
            </button>
          ) : null,
        )}

        {/* Ellipsis */}
        {page + 3 < totalPages && (
          <span className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-500">
            ...
          </span>
        )}

        {/* Last Page */}
        {page !== totalPages && (
          <button
            onClick={() => setPage(totalPages)}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {totalPages}
          </button>
        )}

        {/* Next button */}
        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className={`inline-flex items-center justify-center rounded-md border border-gray-300 bg-[#63B88333] px-2.5 py-1.5 text-xs font-medium ${
            page === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#63B883] hover:bg-gray-50"
          } shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default UserManagementTable;
