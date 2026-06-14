import { api } from "@/lib/api";
import { AddBlogSchema, IBlogModel, IBlogSchema } from "@/types/blog.types";
import { create } from "zustand";

interface BlogStore {
  blogs: IBlogSchema[] | null;
  fetchAllBlgos: () => void;
  toggleLike: (blogId: string, userId: string) => void;
  addBlog: (data: AddBlogSchema) => void;
}

const useBlogStore = create<BlogStore>((set) => ({
  blogs: null,
  fetchAllBlgos: async () => {
    try {
      const response = await api.get("/blogs/");
      if (response.status === 200) {
        set({ blogs: response.data.blogs });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  },
  toggleLike: async (blogId: string, userId: string) => {
    try {
      const response = await api.post("/blogs/like", { blogId, userId });
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  },
  addBlog: async (data: AddBlogSchema) => {
    const response = await api.post("/blogs/", data);
    console.log(response);
  },
}));

export default useBlogStore;
