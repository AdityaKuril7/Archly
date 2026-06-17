"use client"
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import { IBlogSchema } from "@/types/blog.types";
import {
  Hand,
  MessageCircle,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  BadgeCheck,
  BookmarkCheck, BookmarkOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function BlogCard({ blog }: { blog: IBlogSchema }) {
  const { toggleLike, toogleSave } = useBlogStore();
  const { user } = useAuthStore();

  const [liked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [likeCount, setLikeCount] = useState(blog.likes.length);

  useEffect(() => {
    setLikeCount(blog.likes.length);

    setIsLiked(
      blog.likes.some((id) => id.toString() === user?._id?.toString()),
    );
  }, [blog.likes, blog._id, user?._id, user?.savedBlogs]);

  useEffect(() => {
    setIsSaved(
      user?.savedBlogs?.some(
        (_id) => _id.toString() === blog._id?.toString(),
      ) ?? false,
    );
  }, [user?.savedBlogs, blog._id]);

  const handleLike = () => {
    if (!user?._id) return;

    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);

    toggleLike(blog._id, user._id);
  };

  const handleSave = () => {
    setIsSaved((prev) => !prev); // optimistic toggle
    toogleSave(blog._id, user?._id as string);
  };
  const router = useRouter();
  return (
    <div className="mb-8 border-b pb-8 cursor-pointer" onClick={()=> router.push(`/blog/${blog.slug}`)} style={{ transition: "all 0.3s ease-in-out"}}>
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/user-profile/${blog?.author.username}`} className="font-medium cursor-pointer hover:underline hover:underline-offset-2 hover:text-blue-700">{blog.author.username}</Link>

            <BadgeCheck size={16} className="fill-blue-500 text-blue-500" />

            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold leading-tight">
            {blog.title}
          </h2>

          <p className="line-clamp-2 text-xl leading-relaxed text-gray-600">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-5 text-gray-500">
              <div
                onClick={handleLike}
                className="flex cursor-pointer items-center gap-1"
              >
                <Hand
                  size={18}
                  className={liked ? "text-red-500" : "text-black"}
                />

                <span className={liked ? "text-red-500" : "text-black"}>
                  {likeCount}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MessageCircle size={18} />
                <span>2</span>
              </div>

              <div className="flex items-center gap-1">
                <Repeat2 size={18} />
                <span>1</span>
              </div>
            </div>

            <div
              onClick={handleSave}
              className="flex items-center gap-4 text-gray-500"
            >
              {isSaved ? <Bookmark className={'fill-black text-black'} size={20} /> : <Bookmark size={20} />}

              <MoreHorizontal size={20} />
            </div>
          </div>
        </div>

        <div className="h-40 w-60 shrink-0">
          <motion.img
            src={blog.image}
            alt="blog"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
