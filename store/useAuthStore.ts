import { create } from "zustand";
import {
  ILoggedUserSchema,
  ILoginSchema,
  ISignupUserSchema,
} from "@/types/user.types";
import { api } from "@/lib/api";

interface AuthStore {
  loading: boolean;
  user: ILoggedUserSchema | null;
  signup: (
    data: ISignupUserSchema,
  ) => Promise<{ success: boolean; message: string }>;
  login: (data: ILoginSchema) => Promise<{ success: boolean; message: string }>;
  fetchMe: () => void;
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
      set({ loading: false });
      return {
        success: false,
        message: "Something missing",
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
      set({ loading: false });
      return {
        success: false,
        message: "Something missing",
      };
    }
  },
  fetchMe: async () => {
    try {
      const response = await api.get("/auth/me");
      console.log(response.data.user);

      if (response.status === 200) {
        set({ user: response.data.user });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
}));

export default useAuthStore;
