"use client";

import CustomerTable from "@/components/admin/CustomerTable";
import OrderList from "@/components/admin/OrderList";
import { CircleDollarSign, ListOrdered, ShoppingCart } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "$12,450",
    today: "150",
    icon: <CircleDollarSign className="w-6 h-6 text-emerald-500" />,
    bgColor: "bg-emerald-50",
  },
  {
    label: "Total Sales",
    value: "1,234",
    today: "48",
    icon: <ShoppingCart className="w-6 h-6 text-orange-500" />,
    bgColor: "bg-orange-50",
  },
  {
    label: "Today Revenue",
    value: "$1,234",
    today: "$48",
    icon: <CircleDollarSign className="w-6 h-6 text-emerald-500" />,
    bgColor: "bg-emerald-50",
  },
  {
    label: "Today Sales",
    value: "23",
    today: "4",
    icon: <ListOrdered className="w-6 h-6 text-pink-500" />,
    bgColor: "bg-pink-50",
  },
];

const OverViewPage = () => {
  return (
    <div className="space-y-8 lg:p-4 p-1 md:p-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {stat.label}
                </p>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </h2>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables/Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Recent Cashier</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="p-2">
            <CustomerTable />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Latest Orders</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-125 custom-scrollbar">
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
