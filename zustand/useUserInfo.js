import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserInfo = create(
  persist(
    (set) => ({
      userInfo: null,
      isLogged: false,
      hasHydrated: false, // New state to check hydration
      updateUserInfo: (data) => {
        set({
          userInfo: data,
          isLogged: true,
        });
      },
      resetUserInfo: () => {
        set({
          userInfo: null,
          isLogged: false,
        });
      },
      setHydrated: () => set({ hasHydrated: true }), // Setter for hydration
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export { useUserInfo };
