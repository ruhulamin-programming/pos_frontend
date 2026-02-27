"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { month: "Jan", revenue: 34000 },
  { month: "Feb", revenue: 30000 },
  { month: "Mar", revenue: 39000 },
  { month: "Apr", revenue: 36000 },
  { month: "May", revenue: 46000 },
  { month: "Jun", revenue: 38600 },
  { month: "Jul", revenue: 37000 },
  { month: "Aug", revenue: 40000 },
  { month: "Sep", revenue: 50000 },
  { month: "Oct", revenue: 39000 },
  { month: "Nov", revenue: 32000 },
  { month: "Dec", revenue: 24000 },
];

export default function TotalRevenueChart() {
  return (
    <div className="w-full h-96">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-none">
            Total Revenue
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Monthly performance review
          </p>
        </div>
        <div className="flex bg-gray-50 p-1.5 rounded-lg border border-gray-100">
          <button className="px-4 py-1.5 text-xs font-bold text-purple-700 bg-white shadow-sm rounded-md transition-all">
            Monthly
          </button>
          <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 transition-all">
            Yearly
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(val) => `$${val / 1000}k`} />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <ReferenceLine
            x="Jun"
            stroke="#16a34a"
            strokeDasharray="3 3"
            label={{
              value: "June 2024\nRevenue : $38,600",
              position: "top",
              fill: "#16a34a",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#revenueGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: "#16a34a" }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
