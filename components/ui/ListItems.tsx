import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IConnectionUser } from "@/types/social.types";
import Image from "next/image";
import Link from "next/link";
import useSocialStore from "@/store/useSocialStore";
import { use, useState } from "react";
import { toast, Toaster } from "sonner";
import { usePresence } from "framer-motion";
import useProfileStore from "@/store/useProfileStore";
import useAuthStore from "@/store/useAuthStore";

export default function ListItems({
  user,
  isForFollowers,
}: {
  user: IConnectionUser;
  isForFollowers: boolean;
}) {
  const { toggleFollowUser, removeFollower } = useSocialStore();
  const { fetchConnections, fetchProfile } = useProfileStore();
  const { getUsername } = useAuthStore();
  const toggleFollow = async () => {
    const { success } = await toggleFollowUser(user._id);
    if (success) {
      fetchConnections("following");
      const username = getUsername();
      if (!username) return;
      fetchProfile(username);
    }
  };

  const handleRemoveUser = async () => {
    const { success } = await removeFollower(user._id);
    if (success) {
      fetchConnections("followers");
      const username = getUsername();
      if (!username) return;
      fetchProfile(username);
    }
  };

  return (
    <div className={"h-20 border-b  w-full flex items-center justify-between"}>
      <div className={"flex items-center gap-3 p-4"}>
        {/* avatar */}
        <Link href={`/user-profile/${user.username}`}>
          <div
            className={
              "h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center"
            }
          >
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.username}
                width={50}
                height={50}
                className={"w-full h-full object-cover rounded-full"}
              />
            ) : (
              <Label>{user.username[0]}</Label>
            )}
          </div>
        </Link>

        {/*  */}
        <div className={"flex flex-col "}>
          <Link href={`/user-profile/${user.username}`}>
            <Label className={"cursor-pointer"}>{user.username}</Label>
          </Link>
        </div>
      </div>

      <Button
        onClick={() => (isForFollowers ? handleRemoveUser() : toggleFollow())}
        variant={"destructive"}
      >
        {isForFollowers ? "Remove" : "Unfollow"}
      </Button>
    </div>
  );
}
