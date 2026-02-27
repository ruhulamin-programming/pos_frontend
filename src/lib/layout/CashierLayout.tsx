import React from "react";
import Sidebar from "@/components/cashier/Sidebar";
import Header from "@/components/cashier/Header";

const CashierLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CashierLayout;
