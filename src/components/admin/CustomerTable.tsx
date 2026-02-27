import React from "react";
import Image from "next/image";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

const customersData = [
  {
    name: "James Kiler",
    email: "jameskiler@gmail.com",
    phone: "+6223456789",
    orderId: "BIT-001",
    image: "",
  },
  {
    name: "Md Sujon",
    email: "jameskiler@gmail.com",
    phone: "+6223456789",
    orderId: "BIT-001",
    image: "",
  },
  {
    name: "Brennan",
    email: "jameskiler@gmail.com",
    phone: "+6223456789",
    orderId: "BIT-001",
    image: "",
  },
];

const CustomerTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left border-b border-gray-100">
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
              Email
            </th>
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
              Phone
            </th>
            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {customersData.map((customer, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
                    <Image
                      src={
                        customer.image ||
                        `https://ui-avatars.com/api/?name=${customer.name}&background=random`
                      }
                      alt={customer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {customer.name}
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      {customer.orderId}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                <div className="text-sm text-gray-500 font-medium">
                  {customer.email}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                <div className="text-sm text-gray-500 font-medium">
                  {customer.phone}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center gap-2">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
