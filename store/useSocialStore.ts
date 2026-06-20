import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { create } from "zustand";

interface SocialStore {
  toggleFollowUser: (
    followerId: string,
    followingId: string,
  ) => Promise<{ success: boolean; message: string }>;
  uploadComment: (
    blogId: string,
    content: string,
  ) => Promise<{ success: boolean; message: string }>;
}

const useSocialStore = create<SocialStore>((set) => ({
  toggleFollowUser: async (followerId: string, followingId: string) => {
    try {
      const response = await api.post("/users/follow", {
        followerId,
        followingId,
      });
      if (response.status === 200) {
        return {
          success: response.data.success,
          message: response.data.message,
        };
      } else {
        return {
          success: response.data.success,
          message: response.data.message,
        };
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          success: e.response?.data.success,
          message: e.response?.data.message,
        };
      } else {
        return {
          success: false,
          message: "Something went wrong",
        };
      }
    }
  },

  uploadComment: async (blogId: string, content: string) => {
    try {
      const response = await api.post(`/blogs/${blogId}/comment`, { content });
      if (response.status === 201) {
        return {
          success: response.data.success,
          message: response.data.message,
        };
      } else {
        return {
          success: response.data.success,
          message: response.data.message,
        };
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          success: e.response?.data.success,
          message: e.response?.data.message,
        };
      } else {
        return {
          success: false,
          message: "Something went wrong",
        };
      }
    }
  },
}));

export default useSocialStore;
