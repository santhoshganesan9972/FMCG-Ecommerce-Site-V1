import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface WishlistStore {
  wishlist: WishlistItem[];

  addToWishlist: (
    item: WishlistItem
  ) => void;

  removeFromWishlist: (
    id: number
  ) => void;

  moveToCart: (id: number) => WishlistItem | undefined;
}

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({
        
        wishlist: [
          { id: 3, name: "Fortune Sunflower Oil", image: "/placeholder.svg?text=Oil", price: 195 },
          { id: 8, name: "Britannia Milk Bread", image: "/placeholder.svg?text=Bread", price: 35 },
          { id: 15, name: "Lays Chips", image: "/placeholder.svg?text=Chips", price: 30 },
        ],

        addToWishlist: (item) =>
          set((state) => ({
            wishlist: [...state.wishlist, item],
          })),

        removeFromWishlist: (id) =>
          set((state) => ({
            wishlist: state.wishlist.filter(
              (item) => item.id !== id
            ),
          })),

        moveToCart: (id) => {
          const item = get().wishlist.find((i) => i.id === id);
          if (item) {
            set((state) => ({
              wishlist: state.wishlist.filter((i) => i.id !== id),
            }));
            return item;
          }
          return undefined;
        },
      }),
      { name: "wishlist-storage" }
    )
  );