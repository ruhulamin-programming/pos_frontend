"use client";

import { PiBowlFoodDuotone } from "react-icons/pi";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[];
  isLoading: boolean;
  cart: any[];
}

const ProductGrid = ({ products, isLoading, cart }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-gray-200/20 border border-gray-100 animate-pulse"
          >
            <div className="aspect-square bg-gray-50 rounded-2xl mb-4"></div>
            <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-100 rounded-full w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm text-gray-400">
        <PiBowlFoodDuotone size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-bold">No products found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return (
          <ProductCard key={product.id} product={product} cartItem={cartItem} />
        );
      })}
    </div>
  );
};

export default ProductGrid;
