import { api } from "@/lib/api";
import { AddBlogSchema, IBlogSchema } from "@/types/blog.types";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

interface BlogStore {
  blogs: IBlogSchema[] | null;
  blog: IBlogSchema | null;
  loading: boolean;
  savedBlogs: IBlogSchema[] | null;
  userBlogs: IBlogSchema[] | null;
  fetchAllBlogs: () => void;
  fetchBlog: (slug: string) => Promise<boolean>;
  toggleLike: (blogId: string) => Promise<boolean>;
  addBlog: (
    data: AddBlogSchema,
  ) => Promise<{ success: boolean; message: string }>;
  toggleSave: (blogId: string) => Promise<boolean>;
  searchBlogs: (query: string) => void;
  fetchLibrary: (userId: string) => void;
  fetchUsersBlogs: (userId: string) => void;
}

const useBlogStore = create<BlogStore>((set) => ({
  blogs: null,
  blog: null,
  loading: false,
  userBlogs: null,
  savedBlogs: null,
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
  toggleLike: async (blogId: string) => {
    try {
      const response = await api.post("/blogs/like", { blogId });
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
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
  toggleSave: async (blogId: string) => {
    try {
      const response = await api.post("/blogs/save", { blogId });
      if (response.status === 200) {
        const { user, fetchMe } = useAuthStore.getState();
        await fetchMe(); // re-fetch user so savedBlogs is fresh
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  searchBlogs: async (query: string) => {
    try {
      const response = await api.get(`/blogs/search?q=${query}`);
      if (response.status === 200) {
        set({ blogs: response.data.blogs });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  },
  fetchLibrary: async (userId: string) => {
    try {
      set({ loading: true });
      const response = await api.post("/blogs/user-saves", { userId });
      if (response.status === 200) {
        set({ savedBlogs: response.data.blogs, loading: false });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        set({ loading: false });
      }
      set({ loading: false });
    }
  },
  fetchUsersBlogs: async (username: string) => {
    try {
      set({ loading: true });
      const response = await api.get(
        `http://localhost:3000/api/blogs/my-blogs/${username}?status=published`,
      );
      if (response.status === 200) {
        set({ userBlogs: response.data.blogs, loading: false });
      }
      set({ loading: false });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);

      set({ loading: false });
    }
  },
  fetchBlog: async (slug: string) => {
    try {
      set({ loading: true });

      const response = await api.get(`/blogs/slug/${slug}`);
      if (response.status === 200) {
        set({ blog: response.data.blog[0], loading: false });
        return true;
      }
      return false;
    } catch (e) {
      set({ loading: false });
      return false;
    }
  },
}));

export default useBlogStore;
