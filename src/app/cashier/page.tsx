"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useProductsByCategoryQuery } from "@/lib/services/productApi";
import ProductGrid from "@/components/cashier/ProductGrid";
import CartSidebar from "@/components/cashier/CartSidebar";

const CashierPage = () => {
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

  return (
    <div className="flex gap-8 relative min-h-[calc(100vh-140px)]">
      <div className="flex-1 space-y-6">
        <ProductGrid products={products} isLoading={isLoading} cart={cart} />
      </div>

      <CartSidebar cart={cart} totalPrice={totalPrice} />
    </div>
  );
};

export default CashierPage;
