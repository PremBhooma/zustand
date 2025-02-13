// src/store/userStore.js
import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "@/configs/constant";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  // Get All Users
  getAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASEURL}api/user/get-all-users`);
      set({ users: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Delete User
  deleteUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${BASEURL}api/user/delete/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export { useUserStore };
