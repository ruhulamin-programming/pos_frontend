"use client";
import { useMyProfileQuery } from "@/lib/services/userApi";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { data, isLoading } = useMyProfileQuery("");
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80  border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between  shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <p className="hidden sm:block text-xs text-gray-500 font-medium uppercase tracking-wider">
            Welcome back, {isLoading ? "..." : data?.result?.username}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900 leading-none mb-1">
              {isLoading ? "Loading..." : data?.result?.username}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Administrator
            </span>
          </div>

          <Link
            href="/admin/profile"
            className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-purple-100 transition-all hover:ring-purple-200"
          >
            {data?.result?.profileImage ? (
              <Image
                alt="profile"
                src={data?.result?.profileImage}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-purple-50 text-purple-600">
                <CgProfile size={28} />
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
