import {create} from "zustand"
import {IBlogSchema} from "@/types/blog.types";
import {api} from "@/lib/api";

interface DashboardStore {
  blogs: IBlogSchema[] | null,
  fetchDashboardBlogs: (username:string) => void
}

export const useDashboardStore = create<DashboardStore>((set)=>({
  blogs: null,
  fetchDashboardBlogs: async (username:string) => {
    try{
      const response = await api.get(`/blogs/my-blogs/${username}`)
      if(response.status === 200) set({ blogs: response.data.blogs})
    }catch(err){
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }
}))