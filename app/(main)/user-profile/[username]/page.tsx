"use client"
import React, {useEffect} from "react";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {PenBox} from "lucide-react";
import BlogCard from "@/components/ui/BlogCard";
import useBlogStore from "@/store/useBlogStore";
import useAuthStore from "@/store/useAuthStore";
import { use } from "react";
import useProfileStore from "@/store/useProfileStore";

export default function Profile({params}:{params: Promise<{ username:string }>}) {

  const {username} = use(params);
  const {profileUser,profileBlog,fetchProfile} = useProfileStore()

  useEffect(() => {
    fetchProfile(username)
  }, [])
  return <div className="h-600px w-240 justify-self-center  flex flex-col  overflow-scroll">
    <header className={'h-auto flex flex-col gap-5 border-b-2 pb-5 p-5'}>
      {/*Avatar*/}
      <div className={'w-30 h-30 rounded-full border bg-blue-300 flex items-center justify-center'}>
        <Label className={'text-3xl font-bold'}>{profileUser?.username[0]}</Label>

      </div>
      <div className={'flex flex-col gap-3 max-w-130'}>
        <Label className={'text-2xl text-black font-bold'}>{profileUser?.username}</Label>
        <Label className={'text-sm text-gray-600 text-xl'}>Writing about tech, travel, and things that matter. CS
          student & full-stack dev.</Label>
      </div>

      <div className={'flex items-center justify-between'}>
        <div className={'flex gap-4 text-gray-600'}>
          <Label className={'text-xl '}>{profileBlog?.length} published</Label>
          <Label className={'text-xl '}>{profileUser?.followers.length} followers</Label>
          <Label className={'text-xl '}>{profileUser?.following.length} following</Label>
        </div>

        <div className={'flex gap-4 text-gray-600'}>
          <Button variant={'outline'}>Follow</Button>
          <Button variant={'outline'}>Message</Button>
          <Button variant={'outline'}><PenBox/>Edit Profile</Button>
        </div>

      </div>

    </header>
    <div className={"w-full h-full grid grid-cols-1 p-5 py-10"}>
      {profileBlog?.map((blog, index) => (
        <BlogCard key={index} blog={blog}/>
      ))}
    </div>

  </div>;
};

