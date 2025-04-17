import { create } from 'zustand';

export const useAuth = create((set) => ({
  isPassenger: false,
  isAdmin: false,
  setPassenger: () => set({ isPassenger: true, isAdmin: false }),
  setAdmin: () => set({ isPassenger: false, isAdmin: true }),
  logout: () => set({ isPassenger: false, isAdmin: false }),
}));
