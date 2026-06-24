import {Card} from "@/components/ui/card";
import useProfileStore from "@/store/useProfileStore";
import {Label} from "@/components/ui/label";
import {ImageIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {IUpdateUser} from "@/types/user.types";
import {toast} from "sonner";
import Image from "next/image";

export default function EditProfileCard() {
  const {toggleEditCard,updateProfile} = useProfileStore()
  const [bio,setBio] = useState<string>();
  const [avatar,setAvatar] = useState<File>();
  const [avatarPreview,setAvatarPreview] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);

  const uploadToCloudinary = async (file: File) =>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zsp0yydw");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return data.secure_url;
  }


  const selectImage = () =>{
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.click()
    input.onchange = (e) =>{
      const file = (e.target as HTMLInputElement).files?.[0]
      if(!file){
        return
      }
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleUpdateProfile = async () =>{
    setLoading(true)
    const updatedVersion: IUpdateUser = {} as IUpdateUser;
    if(bio){
      updatedVersion.bio = bio
    }

    if(avatar){
      const imageUrl = await uploadToCloudinary(avatar)
      console.log("Image: ",imageUrl)
      if(imageUrl){
        updatedVersion["avatar"] = imageUrl
      }
    }

    const result = await updateProfile(updatedVersion);

    if(result){
      toggleEditCard()
      toast.info("Profile updated successfully")
      setLoading(false)
      window.location.reload()
    }
    setLoading(false)

  }


  return (
    <div className={'h-screen w-screen backdrop-blur-md bg-black/50 absolute top-0 left-0 flex items-center justify-center'}>
      <Card className={'w-100 h-auto px-7 py-10 bg-white z-51 flex flex-col items-center rounded-xl gap-4 '}>
        <Label className={'text-2xl font-bold'}>Edit Profile</Label>

        {/* Select Avatar */}
        <div onClick={selectImage} className={'h-25 w-25 border rounded-full flex items-center justify-center  border-gray-200'}>
          {avatarPreview ? <Image src={avatarPreview} alt="avatar" width={50} height={50} className={'h-full w-full object-cover rounded-full'}/> : <ImageIcon size={40} />}
        </div>

        {/* Username */}
        <textarea value={bio} onChange={e => setBio(e.target.value)}  className={'w-full border border-gray-200 h-25 rounded-xl p-4 resize-none px-5'} placeholder={'Bio'} />
        <Button disabled={loading} onClick={handleUpdateProfile} className={'w-full h-12'}>Update</Button>
        <Button disabled={loading} onClick={toggleEditCard} className={'w-full h-12'} variant={'destructive'}>Cancel</Button>
        {loading && "Uploading Please wait..."}
      </Card>
    </div>
  )
}