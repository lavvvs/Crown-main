import { create } from "zustand";

type CartState = {
  cartCount: number;
  setCartCount: (count: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
}));
