import { create } from "zustand";
import { LoginUserTypes, SignupUserTypes } from "@/types/user.types";
import { api } from "@/lib/api";

interface AuthStore {
  loading: boolean;
  signup: (
    data: SignupUserTypes,
  ) => Promise<{ success: boolean; message: string }>;
  login: (
    data: LoginUserTypes,
  ) => Promise<{ success: boolean; message: string }>;
  fetchMe: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  signup: async (data: SignupUserTypes) => {
    try {
      set({ loading: true });
      const response = await api.post("/auth/signup", data);
      if (response.status === 201) {
        set({ loading: false });
        return {
          success: true,
          message: "Account created successfully",
        };
      } else {
        set({ loading: false });
        return {
          success: false,
          message: "Please check your credentials",
        };
      }
    } catch (e) {
      set({ loading: false });
      return {
        success: false,
        message: "Something missing",
      };
    }
  },
  login: async (data: LoginUserTypes) => {
    try {
      set({ loading: true });

      const response = await api.post("/auth/login/", data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        set({ loading: false });

        return {
          success: true,
          message: "Login successful",
        };
      } else {
        set({ loading: false });

        return {
          success: false,
          message: "Please check your credentials",
        };
      }
    } catch (e) {
      set({ loading: false });
      return {
        success: false,
        message: "Something missing",
      };
    }
  },
  fetchMe: () => {
    try {
    } catch (err) {}
  },
}));

export default useAuthStore;
