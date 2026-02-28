"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { Plus, Minus } from "lucide-react";
import { addToCart, updateCartItemQuantity } from "@/lib/features/cashierSlice";

interface ProductCardProps {
  product: any;
  cartItem?: any;
}

const ProductCard = ({ product, cartItem }: ProductCardProps) => {
  const dispatch = useDispatch();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="bg-white rounded-3xl p-3 shadow-xl shadow-gray-200/20 border border-gray-100 hover:shadow-2xl hover:shadow-purple-200/30 transition-all duration-300 group flex flex-col">
      <div className="aspect-square relative rounded-2xl overflow-hidden mb-3 bg-gray-50 min-h-35">
        <Image
          src={product.productImage || "/placeholder-product.png"}
          alt={product.productName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-black text-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm">
            Stock: {product.quantity}
          </span>
        </div>
      </div>

      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-purple-600 transition-colors line-clamp-1">
            {product.productName}
          </h3>
          <p className="text-[9px] text-gray-400 font-medium truncate mt-0.5">
            {product.category?.categoryName || "Food Item"}
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-purple-600">
              {formatPrice(product.price)}
            </span>
          </div>

          {cartItem ? (
            <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200/50 w-full justify-center">
              <button
                onClick={() =>
                  dispatch(
                    updateCartItemQuantity({
                      id: product.id,
                      quantity: cartItem.quantity - 1,
                    }),
                  )
                }
                className="p-1.5 bg-white text-gray-500 rounded-lg hover:text-rose-500 shadow-sm transition-colors"
              >
                <Minus size={10} />
              </button>
              <span className="w-6 text-center font-black text-xs text-gray-800">
                {cartItem.quantity}
              </span>
              <button
                onClick={() =>
                  dispatch(
                    updateCartItemQuantity({
                      id: product.id,
                      quantity: cartItem.quantity + 1,
                    }),
                  )
                }
                className="p-1.5 bg-white text-gray-500 rounded-lg hover:text-purple-600 shadow-sm transition-colors"
              >
                <Plus size={10} />
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    productName: product.productName,
                    price: product.price,
                    quantity: 1,
                    productImage: product.productImage,
                  }),
                )
              }
              className="w-full p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group/btn active:scale-95"
            >
              <Plus
                size={14}
                className="transition-transform group-hover/btn:rotate-90"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Add
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
