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
import CommentCard from "@/components/ui/CommentCard";

export default function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { blog, fetchBlog } = useBlogStore();
  const router = useRouter();
  const { toggleFollowUser, uploadComment } = useSocialStore();
  const { getUserId, getUsername } = useAuthStore();
  const [isThisUserProfile, setIsThisUserProfile] = useState<boolean>();
  const [viewerAlreadyFollow, setViewerAlreadyFollow] =
    useState<boolean>(false);

  const [userComment, setUserComment] = useState<string>("");

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

  const handleUploadComment = async () => {
    const { success, message } = await uploadComment(blog?._id!, userComment);
    if (success) {
      toast.info(message);
      const userId = getUserId();
      if (!userId) return;
      fetchBlog(blog?.slug as string, userId);
      setUserComment("");
    }
  };

  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;
    fetchBlog(slug, userId);
    console.log(blog);
  }, []);

  useEffect(() => {
    setViewerAlreadyFollow(
      blog?.author.followers.includes(getUserId() || "") || false,
    );
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            src={blog?.image}
            alt="blog"
            className={"w-full h-auto rounded-lg"}
          />
        </div>
      </header>

      <main className="min-h-screen w-full p-5">
        <div
          className="prose max-w-none border-b-2 pb-5 text-[20px] font-serif break-words hyphens-none"
          dangerouslySetInnerHTML={{ __html: blog?.content || "Not Specified" }}
        />

        <div className="w-full h-auto py-5 flex gap-4 p-3 ">
          <p>Hey {getUsername()}</p>
        </div>

        <div className="flex flex-col p-3 gap-4 mb-20">
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="w-full border p-5 h-30  rounded-xl resize-none"
            placeholder="What you think about this ?"
          />
          <Button
            disabled={!userComment}
            variant={"default"}
            className="p-5 w-fit"
            onClick={handleUploadComment}
          >
            Respond
          </Button>
        </div>

        <Label className="font-bold text-3xl m-5 ">Comments</Label>

        <div className="w-full h-auto flex flex-col items-center">
          {blog?.comments.length === 0 ? (
            <Label className="slef-center text-3xl">Be a first commenter</Label>
          ) : (
            blog?.comments.map((comment, index) => (
              <CommentCard key={comment._id} comment={comment} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
