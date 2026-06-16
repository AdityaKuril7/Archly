"use client"
import React, {useEffect} from "react";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {PenBox} from "lucide-react";
import BlogCard from "@/components/ui/BlogCard";
import useBlogStore from "@/store/useBlogStore";
import useAuthStore from "@/store/useAuthStore";

const Profile = () => {
  const {userBlogs, fetchUsersBlogs} = useBlogStore()
  const {getUserId, user, fetchMe} = useAuthStore()

  useEffect(() => {
    const userId = getUserId()
    if (!userId) return console.log("Missing userId")
    fetchUsersBlogs(userId)
    fetchMe();
  }, [])
  return <div className="h-600px w-240 border justify-self-center  flex flex-col  overflow-scroll">
    <header className={'h-auto flex flex-col gap-5 border-b-2 pb-5 p-5'}>
      {/*Avatar*/}
      <div className={'w-30 h-30 rounded-full border bg-blue-300 flex items-center justify-center'}>
        <Label className={'text-3xl font-bold'}>{user?.username[0]}</Label>

      </div>
      <div className={'flex flex-col gap-3 max-w-130'}>
        <Label className={'text-2xl text-black font-bold'}>{user?.username}</Label>
        <Label className={'text-sm text-gray-600 text-xl'}>Writing about tech, travel, and things that matter. CS
          student & full-stack dev.</Label>
      </div>

      <div className={'flex items-center justify-between'}>
        <div className={'flex gap-4 text-gray-600'}>
          <Label className={'text-xl '}>{userBlogs?.length} published</Label>
          <Label className={'text-xl '}>{user?.followers.length} followers</Label>
          <Label className={'text-xl '}>{user?.following.length} following</Label>
        </div>

        <div className={'flex gap-4 text-gray-600'}>
          <Button variant={'outline'}>Follow</Button>
          <Button variant={'outline'}>Message</Button>
          <Button variant={'outline'}><PenBox/>Edit Profile</Button>
        </div>

      </div>

    </header>
    <div className={"w-full h-full grid grid-cols-1 p-5 py-10"}>
      {userBlogs?.map((blog, index) => (
        <BlogCard key={index} blog={blog}/>
      ))}
    </div>

  </div>;
};

export default Profile;
