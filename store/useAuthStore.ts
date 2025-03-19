import { create } from "zustand";

interface AuthState {
  userId: string;
  setUserId: (id: string) => void;
  clearUserId: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  userId: "",
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: "" }),
}));

export default useAuthStore;
