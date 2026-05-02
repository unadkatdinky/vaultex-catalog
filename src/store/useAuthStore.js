import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      
      login: (email, password) => {
        // Mock authentication - In the real world, this verifies with your Go backend!
        if (email === 'admin@vaultex.com' && password === 'admin123') {
          set({ isAuthenticated: true });
          return { success: true };
        }
        return { error: 'Invalid email or password' };
      },
      
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'vaultex-auth', // Saves login state to localStorage
    }
  )
);

export default useAuthStore;