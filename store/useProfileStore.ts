import {create} from "zustand"
import {ILoggedUserSchema, IUpdateUser} from "@/types/user.types";
import {IBlogSchema} from "@/types/blog.types";
import {api} from "@/lib/api";
import {AxiosError} from "axios";
import {IConnectionData} from "@/types/social.types";

interface ProfileStore {
  loading:boolean,
  profileUser: ILoggedUserSchema | null,
  profileBlog: IBlogSchema[] | null,
  fetchProfile: (username:string) => void,
  isEditCardVisible: boolean,
  toggleEditCard: () => void,
  updateProfile: (data:IUpdateUser) => Promise<boolean>,
  isConnectionVisible: boolean;
  toggleConnection: () => void;
  fetchConnections: (filter:string) => void;
  connections: IConnectionData[] | null
}

const useProfileStore = create<ProfileStore>((set,get)=>({
  profileUser:  null,
  loading: false,
  isEditCardVisible: false,
  isConnectionVisible:false,
  connections: null,
  toggleConnection: () => set((state)=> ({isConnectionVisible: !state.isConnectionVisible})),
  toggleEditCard: () => set((state)=> ({isEditCardVisible: !state.isEditCardVisible})),
  profileBlog: null,
  fetchProfile: async (username:string) =>{
    try{
      const response = await api.get(`/blogs/my-blogs/${username}?status=published`)
      if(response.status === 200){
        set({profileBlog: response.data.blogs})
        set({profileUser: response.data.user})
      }
    }catch(error){
      console.log(error)
    }
  },
  updateProfile: async (data:IUpdateUser) => {
    try{
      const response = await api.put("users/",{data})
      if(response.status === 200){
        return true
      }
      return false
    }catch(error){
      console.log(error)
      return false
    }
  },
  fetchConnections: async (filter:string) => {
    set({loading:true})
    try{
      const response = await api.get(`/users/follow?filter=${filter}`)
      if(response.status === 200){
        set({connections: response.data.connections})
        set({loading:false})

      }
      set({loading:false})

    }catch(e){
      if(e instanceof  AxiosError){
        console.log(e.response?.data.message)
        set({loading:false})
      }
      set({loading:false})
    }
  }
}))

export default useProfileStore