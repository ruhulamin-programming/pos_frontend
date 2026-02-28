import { useLatestOrdersQuery } from "@/lib/services/orderApi";
import Image from "next/image";

const OrderList = () => {
  const { data: latestOrders, isLoading } = useLatestOrdersQuery({});
  const orderListData = [
    {
      id: "12345",
      productName: "Chicken Thigh",
      serving: 1,
      productImage:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=100&auto=format&fit=crop",
      status: "Pending",
      time: "5 min ago",
    },
    {
      id: "12346",
      productName: "Beef Burger",
      serving: 2,
      productImage:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100&auto=format&fit=crop",
      status: "Preparing",
      time: "12 min ago",
    },
    {
      id: "12347",
      productName: "French Fries",
      serving: 1,
      productImage:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=100&auto=format&fit=crop",
      status: "Ready",
      time: "15 min ago",
    },
    {
      id: "12348",
      productName: "Coke Large",
      serving: 1,
      productImage:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=100&auto=format&fit=crop",
      status: "Pending",
      time: "20 min ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Preparing":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Ready":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="px-6 py-2">
      {latestOrders?.data.map((order: any, idx: number) => (
        <div
          className={`flex justify-between items-center py-4 ${idx !== latestOrders?.data?.length - 1 ? "border-b border-gray-50" : ""}`}
          key={order?.id + idx}
        >
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                className="object-cover"
                alt={order?.product?.productName}
                src={order?.product?.productImage}
                fill
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {order?.product?.productName}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">
                  {order.quantity} serving
                </span>
                <span className="text-[10px] text-gray-300">•</span>
                <span className="text-xs text-gray-400">
                  {new Date(order?.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}
          >
            {order.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
