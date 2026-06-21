import { create } from "zustand";
import { IBlogSchema } from "@/types/blog.types";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { success } from "zod";
import { error } from "node:console";

interface DashboardStore {
  blogs: IBlogSchema[] | null;
  fetchDashboardBlogs: (username: string) => void;
  toggleVisiblity: (
    blogId: string,
    currentVisiblity: string,
  ) => Promise<{ success: boolean; message: string }>;
  deleteBlog: (blogId:string) => Promise<boolean>
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  blogs: null,
  fetchDashboardBlogs: async (username: string) => {
    try {
      const response = await api.get(`/blogs/my-blogs/${username}`);
      if (response.status === 200) set({ blogs: response.data.blogs });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
  toggleVisiblity: async (blogId: string, status: string) => {
    try {
      let response;
      if (status === "published") {
        response = await api.put(`/blogs/${blogId}`, { status: "draft" });
      } else {
        response = await api.put(`/blogs/${blogId}`, {
          status: "published",
        });
      }
      if (response.status === 200) {
        return { success: true, message: response.data.message };
      }
      return { success: false, message: "Bad request" };
    } catch (err) {
      if (err instanceof AxiosError) {
        return {
          success: false,
          message: err.response?.data.message || "Something went wrong",
        };
      }
      return { success: false, message: "Exception occur" };
    }
  },
  deleteBlog: async (blogId:string) => {
    try{
      const response = await api.delete(`/blogs/${blogId}`)
      if(response.status === 200){
        return true
      }
      return false
    }catch (e) {
      return false
    }
  }
}));
