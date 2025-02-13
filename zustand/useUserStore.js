// src/store/userStore.js
import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "@/configs/constant";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  getAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASEURL}api/user/get-all-users`);
      set({ users: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export { useUserStore };
