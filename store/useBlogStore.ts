import { api } from "@/lib/api";
import { AddBlogSchema, IBlogModel, IBlogSchema } from "@/types/blog.types";
import { create } from "zustand";

interface BlogStore {
  blogs: IBlogSchema[] | null;
  fetchAllBlogs: () => void;
  toggleLike: (blogId: string, userId: string) => void;
  addBlog: (
    data: AddBlogSchema,
  ) => Promise<{ success: boolean; message: string }>;
  toogleSave: (blogId: string, userId: string) => void;
  searchBlogs: (query: string) => void;
}

const useBlogStore = create<BlogStore>((set) => ({
  blogs: null,
  fetchAllBlogs: async () => {
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
    try {
      const response = await api.post("/blogs/", data);
      if (response.status === 201) {
        return { success: true, message: "Blog uploaded successfully" };
      }
      return { success: false, message: "Bad Request " };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: "Something went wrong" };
      }
      return { success: false, message: "Something went wrong" };
    }
  },
  toogleSave: async (blogId: string, userId: string) => {
    try {
      const response = await api.post("/blogs/save", { blogId, userId });
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  },
  searchBlogs: async (query: string) => {
    try {
      const response = await api.get(`/blogs/search?q=${query}`);
      if (response.status === 200) {
        console.log(response.data.blogs);
        set({ blogs: response.data.blogs });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  },
}));

export default useBlogStore;
