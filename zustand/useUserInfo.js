const { create } = require("zustand");
import { persist, createJSONStorage } from "zustand/middleware";

const store = (set) => ({
  userInfo: null,
  isLogged: false,
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
});

const useUserInfo = create(
  persist(store, {
    name: "userInfo",
    store: createJSONStorage(() => sessionStorage),
  })
);

export { useUserInfo };
