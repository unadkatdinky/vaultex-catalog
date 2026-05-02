
  import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const UseStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      compareList: [],

      // Wishlist Actions
      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlist.find((p) => p.itemname === product.itemname);
        if (exists) {
          return { wishlist: state.wishlist.filter((p) => p.itemname !== product.itemname) };
        }
        return { wishlist: [...state.wishlist, product] };
      }),

      // Compare Actions
      addToCompare: (product) => {
        const state = get();
        if (state.compareList.length >= 3) {
          return { error: 'You can only compare up to 3 items.' }; // We'll catch this in the UI
        }
        if (state.compareList.find((p) => p.itemname === product.itemname)) {
          return { error: 'Item is already in compare list.' };
        }
        set({ compareList: [...state.compareList, product] });
        return { success: true };
      },
      
      removeFromCompare: (productName) => set((state) => ({
        compareList: state.compareList.filter((p) => p.itemname !== productName)
      })),
    }),
    {
      name: 'vaultex-storage', // Automatically saves to localStorage
    }
  )
);

export default UseStore;