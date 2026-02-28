"use client";

import { usePlaceOrderMutation } from "@/lib/services/orderApi";
import { clearCart } from "@/lib/features/cashierSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Loader2, Printer, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  totalPrice: number;
}

const OrderConfirmationModal = ({
  isOpen,
  onClose,
  cart,
  totalPrice,
}: OrderConfirmationModalProps) => {
  const dispatch = useDispatch();
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleConfirmOrder = async () => {
    const orderPayload = {
      orderItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        subTotal: item.price * item.quantity,
      })),
    };

    try {
      await placeOrder(orderPayload).unwrap();
      toast.success("Order placed successfully!");

      // Print Invoice before clearing
      handlePrint();

      dispatch(clearCart());
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to place order.");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Popup blocked! Please allow popups to print invoices.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Order Invoice</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; padding: 20px; color: #333; }
            .header { text-align: center; border-bottom: 2px dashed #eee; padding-bottom: 20px; margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
            .total-section { border-top: 2px dashed #eee; margin-top: 20px; padding-top: 20px; }
            .total-row { display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; }
            .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #888; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Easy POS</h1>
            <p>Order Date: ${new Date().toLocaleString()}</p>
            <p>Invoice #INV-${Math.floor(Math.random() * 1000000)}</p>
          </div>
          <div class="items">
            ${cart
              .map(
                (item) => `
              <div class="item">
                <span>${item.productName} x ${item.quantity}</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
              </div>
            `,
              )
              .join("")}
          </div>
          <div class="total-section">
            <div class="total-row">
              <span>Subtotal</span>
              <span>${formatPrice(totalPrice)}</span>
            </div>
            <div class="total-row">
              <span>Tax (5%)</span>
              <span>${formatPrice(totalPrice * 0.05)}</span>
            </div>
            <div class="total-row" style="font-size: 20px; margin-top: 10px; color: #9333ea;">
              <span>Total Payable</span>
              <span>${formatPrice(totalPrice * 1.05)}</span>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for your order!</p>
            <p>Please come again.</p>
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Confirm Order
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 max-h-[40vh] overflow-y-auto px-1 custom-scrollbar mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className="h-14 w-14 relative rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.productImage || "/placeholder-product.png"}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm uppercase">
                    {item.productName}
                  </h4>
                  <p className="text-xs text-gray-500 font-bold">
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                </div>
                <span className="font-black text-purple-600">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-purple-50 space-y-3 mb-8">
            <div className="flex justify-between text-sm font-bold text-gray-500 uppercase">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-500 uppercase">
              <span>Tax (5%)</span>
              <span>{formatPrice(totalPrice * 0.05)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-purple-200">
              <span className="font-black text-gray-900 uppercase">
                Total Payable
              </span>
              <span className="text-3xl font-black text-purple-600">
                {formatPrice(totalPrice * 1.05)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmOrder}
              disabled={isPlacingOrder}
              className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Printer size={18} />
                  Place & Print
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
