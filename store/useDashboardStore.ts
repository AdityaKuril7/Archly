import {create} from "zustand"
import {IBlogSchema} from "@/types/blog.types";
import {api} from "@/lib/api";

interface DashboardStore {
  blogs: IBlogSchema[] | null,
  fetchDashboardBlogs: (userId:string) => void
}

export const useDashboardStore = create<DashboardStore>((set)=>({
  blogs: null,
  fetchDashboardBlogs: async (userId:string) => {
    try{
      const response = await api.get(`/blogs/my-blogs/${userId}`)
      if(response.status === 200) set({ blogs: response.data.blogs})
    }catch(err){
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }
}))