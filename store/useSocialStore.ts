import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { create } from "zustand";

interface SocialStore {
  toggleFollowUser: (
    targetUserId: string,
  ) => Promise<{ success: boolean; message: string }>;
  uploadComment: (
    blogId: string,
    content: string,
  ) => Promise<{ success: boolean; message: string }>;
  deleteComment: (commentId: string, blogId: string) => Promise<boolean>;
  removeFollower: (
    targetUserId: string,
  ) => Promise<{ success: boolean; message: string }>;
}

const useSocialStore = create<SocialStore>((set) => ({
  toggleFollowUser: async (targetUserId: string) => {
    try {
      const response = await api.post("/users/follow", {
        targetUserId,
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

  deleteComment: async (commentId: string, blogId: string) => {
    try {
      const response = await api.delete(
        `/comment/${commentId}?blogId=${blogId}`,
      );
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  },
  removeFollower: async (targetUserId: string) => {
    try {
      const response = await api.post("/users/remove-follower", {
        targetUserId,
      });
      if (response.status === 200) {
        return {
          success: true,
          message: response.data.message,
        };
      } else {
        return {
          success: false,
          message: response.data.message,
        };
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          success: true,
          message: e.response?.data.message,
        };
      } else {
        return {
          success: true,
          message: "Something went wrong",
        };
      }
    }
  },
}));

export default useSocialStore;
