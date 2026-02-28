"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { updateCartItemQuantity, clearCart } from "@/lib/features/cashierSlice";
import { useState } from "react";
import OrderConfirmationModal from "./OrderConfirmationModal";

interface CartSidebarProps {
  cart: any[];
  totalPrice: number;
}

const CartSidebar = ({ cart, totalPrice }: CartSidebarProps) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (cart.length === 0) return null;

  return (
    <>
      <div className="w-64 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col sticky top-4 h-[calc(100vh-140px)] overflow-hidden animate-in slide-in-from-right duration-500 shrink-0">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
          <div>
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <span className="p-1 bg-purple-100 text-purple-600 rounded-lg">
                <ShoppingCart size={12} />
              </span>
              Order
            </h3>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-gray-400 hover:text-rose-500 transition-colors p-1"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 p-2 rounded-2xl border border-gray-50 hover:bg-gray-50/50 transition-colors group"
            >
              <div className="h-10 w-10 relative rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={item.productImage || "/placeholder-product.png"}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div className="flex justify-between items-start gap-1">
                  <h4 className="font-bold text-gray-900 text-[10px] truncate uppercase tracking-tight">
                    {item.productName}
                  </h4>
                  <span className="font-black text-purple-600 text-[10px] whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-bold text-gray-400">
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-1 bg-white rounded-md border border-gray-100 p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartItemQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          }),
                        )
                      }
                      className="p-0.5 text-gray-500 hover:text-rose-500 transition-colors"
                    >
                      <Minus size={8} />
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartItemQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          }),
                        )
                      }
                      className="p-0.5 text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      <Plus size={8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50/50 border-t border-gray-100 space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between text-gray-500 text-[8px] font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-[8px] font-bold uppercase tracking-widest">
              <span>Tax (5%)</span>
              <span>{formatPrice(totalPrice * 0.05)}</span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-gray-200 mt-1.5">
              <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">
                Payable
              </span>
              <span className="text-lg font-black text-purple-600">
                {formatPrice(totalPrice * 1.05)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95 flex items-center justify-center gap-2"
          >
            Place Order
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <OrderConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default CartSidebar;
