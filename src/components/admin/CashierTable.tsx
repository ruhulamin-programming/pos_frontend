import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useUsersQuery } from "@/lib/services/userApi";
import Link from "next/link";

const CashierTable = () => {
  const {
    data: usersData,
    isLoading,
    isError,
  } = useUsersQuery({ page: 1, limit: 4 });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left border-b border-gray-100">
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
              Email
            </th>
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
              Phone No
            </th>
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {usersData?.data?.data.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {user?.fullName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                <div className="text-sm text-gray-500 font-medium">
                  {user?.email}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                <div className="text-sm text-gray-500 font-medium">
                  {user?.phoneNumber}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`/admin/users/${user?.id}`}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashierTable;
