import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  productImage?: string;
}

interface CashierState {
  selectedCategoryId: string | null;
  cart: CartItem[];
}

const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cashier_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CashierState = {
  selectedCategoryId: null,
  cart: getInitialCart(),
};

export const cashierSlice = createSlice({
  name: "cashier",
  initialState,
  reducers: {
    setSelectedCategoryId: (state, action: PayloadAction<string | null>) => {
      state.selectedCategoryId = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cashier_cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cashier_cart", JSON.stringify(state.cart));
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.cart = state.cart.filter((i) => i.id !== action.payload.id);
        }
      }
      localStorage.setItem("cashier_cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cashier_cart");
    },
  },
});

export const {
  setSelectedCategoryId,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} = cashierSlice.actions;

export default cashierSlice.reducer;
