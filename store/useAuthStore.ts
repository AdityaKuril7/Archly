import { create } from "zustand";
import {
  ILoggedUserSchema,
  ILoginSchema,
  ISignupUserSchema,
} from "@/types/user.types";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

interface AuthStore {
  loading: boolean;
  user: ILoggedUserSchema | null;
  signup: (
    data: ISignupUserSchema,
  ) => Promise<{ success: boolean; message: string }>;
  login: (data: ILoginSchema) => Promise<{ success: boolean; message: string }>;
  fetchMe: () => void;
  getUserId: () => string | null;
  getUsername: () => string | null;
}

const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  user: null,
  signup: async (data: ISignupUserSchema) => {
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
      if (e instanceof AxiosError) {
        set({ loading: false });
        return {
          success: false,
          message: e.response?.data.message || "Something went wrong",
        };
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },
  login: async (data: ILoginSchema) => {
    try {
      set({ loading: true });

      const response = await api.post("/auth/login/", data);
      if (response.status === 200) {
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
      if (e instanceof AxiosError) {
        console.log(e.response)
        set({ loading: false });
        return {
          success: false,
          message: e.response?.data.message || "Something went wrong",
        };
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },
  fetchMe: async () => {
    try {
      const response = await api.get("/auth/me");

      if (response.status === 200) {
        set({ user: response.data.user });

        // localStorage.setItem("userId", response.data.user._id as string);
        localStorage.setItem("userId", response.data.user?._id);
        localStorage.setItem("username", response.data.user?.username);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
  getUserId: () => {
    if (typeof window === "undefined") {
      return null;
    }
    const userId : string | null = localStorage.getItem("userId");
    return userId;
  },
  getUsername: () => {
    if (typeof window === "undefined") {
      return null;
    }
    const username: string | null = localStorage.getItem("username");
    return username;
  },
}));

export default useAuthStore;
