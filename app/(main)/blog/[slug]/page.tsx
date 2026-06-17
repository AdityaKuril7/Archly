"use client";
import { use, useEffect, useState } from "react";
import useBlogStore from "@/store/useBlogStore";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useSocialStore from "@/store/useSocialStore";
import useAuthStore from "@/store/useAuthStore";
import { toast, Toaster } from "sonner";
import Link from "next/link";

export default function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { blog, fetchBlog } = useBlogStore();
  const router = useRouter();
  const { toggleFollowUser } = useSocialStore();
  const { getUserId } = useAuthStore();
  const [isThisUserProfile, setIsThisUserProfile] = useState<boolean>();
  const [viewerAlreadyFollow, setViewerAlreadyFollow] =
    useState<boolean>(false);

  const handleFollowUser = async () => {
    const followerId = getUserId();
    const followingId = blog?.author._id;
    if (!followerId) {
      toast.info("You need to login first");
      return;
    }
    const result = await toggleFollowUser(followerId, followingId!);
    const isNowFollowing = !viewerAlreadyFollow;
    setViewerAlreadyFollow(isNowFollowing);
    toast.info(result.message);
  };

  useEffect(() => {
    fetchBlog(slug);
    console.log(blog);
  }, []);

  useEffect(() => {
    setViewerAlreadyFollow(blog?.author.followers.includes(getUserId()));
    const authorId = blog?.author._id;
    const userId = getUserId();

    setIsThisUserProfile(authorId === userId);
  }, [blog]);

  return (
    <div
      className={
        "w-200 h-[90vh]  justify-self-center font-serif flex flex-col items-center overflow-scroll"
      }
    >
      <Toaster />
      <header
        className={
          " h-auto w-full p-5 flex items-center justify-center flex-col gap-4"
        }
      >
        <Label className={"text-4xl font-bold text-gray-800"}>
          {blog?.title}
        </Label>
        <Label className={"text-lg text-gray-500"}>{blog?.excerpt}</Label>

        <div
          className={
            "self-start w-full h-auto flex items-center justify-between"
          }
        >
          <div className={" h-auto flex items-center gap-3"}>
            <div
              onClick={() =>
                router.push(`/user-profile/${blog?.author.username}`)
              }
              className={
                "w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center"
              }
            >
              <Label>{blog?.author.username[0]}</Label>
            </div>
            <Link
              href={`/user-profile/${blog?.author.username}`}
              className="hover:underline hover:underline-offset-2 hover:text-blue-600"
            >
              {blog?.author.username}
            </Link>
            {!isThisUserProfile && (
              <Button
                onClick={() => handleFollowUser()}
                variant={"outline"}
                className={"text-sm border-gray-400"}
              >
                {viewerAlreadyFollow ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>

          <div className={"flex items-center gap-5"}>
            <Label className={" text-gray-800"}>{blog?.category}</Label>
            <Label>
              {new Date(blog?.createdAt as string).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Label>
          </div>
        </div>
        <div className={"w-full overflow-hidden rounded-lg"}>
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: .3, ease: "easeInOut" }}
            src={blog?.image}
            alt="blog"
            className={"w-full h-auto rounded-lg"}
          />
        </div>
      </header>

      <main className="min-h-screen w-full p-5">
        <div
          className="prose max-w-none text-[20px] font-serif break-words hyphens-none"
          dangerouslySetInnerHTML={{ __html: blog?.content || "Not Specified" }}
        />
      </main>
    </div>
  );
}
