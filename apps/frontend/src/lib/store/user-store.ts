import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orderHistory: string[];
}

interface UserStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addToOrderHistory: (orderId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),
      addToOrderHistory: (orderId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                orderHistory: [...(state.user.orderHistory || []), orderId],
              }
            : null,
        })),
    }),
    {
      name: "user-storage",
    }
  )
); 