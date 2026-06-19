"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import BlogCard from "@/components/ui/BlogCard";
import useBlogStore from "@/store/useBlogStore";
import useAuthStore from "@/store/useAuthStore";
import { use } from "react";
import useProfileStore from "@/store/useProfileStore";
import { toast, Toaster } from "sonner";
import useSocialStore from "@/store/useSocialStore";

export default function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const { toggleFollowUser } = useSocialStore();
  const { getUserId, getUsername } = useAuthStore();
  const userId = getUserId();
  const { profileUser, profileBlog, fetchProfile } = useProfileStore();
  const [viewerAlreadyFollow, setViewerAlreadyFollow] =
    useState<boolean>(false);
  const [followersLength, setFollowersLength] = useState<number>(0);
  const [isThisUserAccount, setIsThisUserAccount] = useState<boolean>();

  const handleFollowUser = async () => {
    const followerId = userId;
    const followingId = profileUser?._id;
    if (!followerId) {
      toast.info("You need to login first");
      return;
    }
    const result = await toggleFollowUser(followerId, followingId!);
    const isNowFollowing = !viewerAlreadyFollow;
    setViewerAlreadyFollow(isNowFollowing);
    toast.info(result.message);
    setFollowersLength((prev) => (isNowFollowing ? prev + 1 : prev - 1));
  };

  useEffect(() => {
    fetchProfile(username);
    setIsThisUserAccount(username === getUsername());
  }, [username]);

  useEffect(() => {
    if (!profileUser || !userId) return;
    setViewerAlreadyFollow(profileUser.followers.includes(userId));
    setFollowersLength(profileUser.followers.length);
  }, [profileUser, userId]);

  return (
    <div className="h-200 w-240 justify-self-center flex flex-col overflow-scroll">
      <Toaster />
      <header className={"h-auto flex flex-col gap-5 border-b-2 pb-5 p-5"}>
        <div
          className={
            "w-30 h-30 rounded-full border bg-blue-300 flex items-center justify-center"
          }
        >
          <Label className={"text-3xl font-bold"}>
            {profileUser?.username[0]}
          </Label>
        </div>
        <div className={"flex flex-col gap-3 max-w-130"}>
          <Label className={"text-2xl text-black font-bold"}>
            {profileUser?.username}
          </Label>
          <Label className={"text-gray-600 text-xl"}>
            {profileUser?.bio ? profileUser?.bio : "Bio Not Specified"}
          </Label>
        </div>

        <div className={"flex items-center justify-between"}>
          <div className={"flex gap-4 text-gray-600"}>
            <Label className={"text-xl"}>{profileBlog?.length} published</Label>
            <Label className={"text-xl"}>{followersLength} followers</Label>
            <Label className={"text-xl"}>
              {profileUser?.following.length} following
            </Label>
          </div>

          <div className={"flex gap-4 text-gray-600"}>
            {!isThisUserAccount && (
              <Button variant={"outline"} onClick={handleFollowUser}>
                {viewerAlreadyFollow ? "Unfollow" : "Follow"}
              </Button>
            )}
            <Button variant={"outline"}>Message</Button>
            <Button variant={"outline"}>
              <PenBox />
              Edit Profile
            </Button>
          </div>
        </div>
      </header>
      <div className={"w-full h-full grid grid-cols-1 p-5 py-10"}>
        {profileBlog?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}
