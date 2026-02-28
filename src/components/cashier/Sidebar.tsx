"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { HomeIcon, LogOutIcon, Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { BiCategory } from "react-icons/bi";
import { useGetCategoriesQuery } from "@/lib/services/categoryApi";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useGetCategoriesQuery({});
  const categories = categoriesResponse?.data || [];

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 shrink-0 flex flex-col",
          "transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "lg:translate-x-0 lg:static": true,
          },
        )}
      >
        {/* Logo */}
        <div className="py-4 flex items-center justify-center border-b border-gray-200 shrink-0">
          <Link href="/cashier" className="text-2xl font-bold text-gray-800">
            Easy <span className="text-purple-600">POS</span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {/* Categories Mapping */}
          <div className="pt-2">
            <p className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Categories
            </p>
            <div className="space-y-1">
              {isLoading ? (
                <div className="space-y-2 px-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-10 bg-gray-100 animate-pulse rounded-lg"
                    ></div>
                  ))}
                </div>
              ) : (
                categories?.map((category: any) => {
                  const isActive = pathname.includes(category?.id);
                  return (
                    <button
                      key={category?.id}
                      className={clsx(
                        "w-full group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                        isActive
                          ? "bg-purple-50 text-purple-700 font-bold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-purple-600",
                      )}
                      onClick={() => {
                        // Handle category selection logic here if needed
                        setIsOpen(false);
                      }}
                    >
                      <Image
                        src={
                          category?.icon ??
                          "https://cdn-icons-png.freepik.com/512/4300/4300605.png"
                        }
                        width={20}
                        height={20}
                        alt="icon"
                      />
                      <span className="text-sm truncate">
                        {category?.categoryName}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 transition"
          >
            <LogOutIcon size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
