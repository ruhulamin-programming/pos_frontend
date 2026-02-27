"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import {
  HomeIcon,
  ListOrdered,
  LogOutIcon,
  Menu,
  User2Icon,
  UserIcon,
  X,
} from "lucide-react";
import Cookies from "js-cookie";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const links = [
    { href: "/admin/overview", label: "Overview", icon: HomeIcon },
    { href: "/admin/users", label: "User Management", icon: User2Icon },
    { href: "/admin/category", label: "Category", icon: BiCategory },
    {
      href: "/admin/product",
      label: "Product Management",
      icon: PiBowlFoodDuotone,
    },
    { href: "/admin/order", label: "Order Management", icon: ListOrdered },
    { href: "/admin/profile", label: "Profile", icon: UserIcon },
  ];

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
          <Link
            href="/admin/overview"
            className="text-2xl font-bold text-gray-800"
          >
            Easy <span className="text-purple-600">POS</span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "group flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  active
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  size={20}
                  className={clsx(
                    "transition-colors",
                    active
                      ? "text-white"
                      : "text-gray-400 group-hover:text-purple-700",
                  )}
                />
                <span className="font-medium text-sm tracking-wide">
                  {label}
                </span>
              </Link>
            );
          })}
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
