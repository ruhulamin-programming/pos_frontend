"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useProductsByCategoryQuery } from "@/lib/services/productApi";
import Image from "next/image";
import {
  addToCart,
  updateCartItemQuantity,
  clearCart,
} from "@/lib/features/cashierSlice";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { PiBowlFoodDuotone } from "react-icons/pi";

const CashierPage = () => {
  const dispatch = useDispatch();
  const selectedCategoryId = useSelector(
    (state: RootState) => state.cashier.selectedCategoryId,
  );
  const cart = useSelector((state: RootState) => state.cashier.cart);

  const { data: productResponse, isLoading } = useProductsByCategoryQuery(
    { categoryId: selectedCategoryId, page: 1, limit: 100 },
    { skip: !selectedCategoryId },
  );

  const products = productResponse?.data?.data || [];
  const totalPrice =
    cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="flex gap-8 relative min-h-[calc(100vh-140px)]">
      {/* Products Section */}
      <div className="flex-1 space-y-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product: any) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-3 shadow-xl shadow-gray-200/20 border border-gray-100 hover:shadow-2xl hover:shadow-purple-200/30 transition-all duration-300 group flex flex-col"
                >
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
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm text-gray-400">
            <PiBowlFoodDuotone size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-bold">
              No products found in this category
            </p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {cart?.length > 0 && (
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

            <button className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierPage;
