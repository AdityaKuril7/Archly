import {create} from "zustand"
import {ILoggedUserSchema, IUpdateUser} from "@/types/user.types";
import {IBlogSchema} from "@/types/blog.types";
import {api} from "@/lib/api";

interface ProfileStore {
  profileUser: ILoggedUserSchema | null,
  profileBlog: IBlogSchema[] | null,
  fetchProfile: (username:string) => void,
  isEditCardVisible: boolean,
  toggleEditCard: () => void,
  updateProfile: (data:IUpdateUser) => void,
}

const useProfileStore = create<ProfileStore>((set)=>({
  profileUser:  null,
  isEditCardVisible: false,
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

    }catch(error){

    }
  }
}))

export default useProfileStore