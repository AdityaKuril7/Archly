"use client"
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import {IBlogSchema} from "@/types/blog.types";
import {BadgeCheck, Bookmark, EyeIcon, Hand, MessageCircle, MoreHorizontal,} from "lucide-react";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function BlogCard({ blog }: { blog: IBlogSchema }) {
  const { toggleLike, toggleSave } = useBlogStore();
  const { user } = useAuthStore();

  const [liked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [likeCount, setLikeCount] = useState(blog.likes.length);

  useEffect(() => {
    setLikeCount(blog.likes.length);

    setIsLiked(
      blog.likes.some((id) => id.toString() === user?._id?.toString()),
    );
  }, [blog.likes,user?._id]);

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
    toggleSave(blog._id, user?._id as string);
  };
  const router = useRouter();
  return (
    <div className="mb-8 border-b pb-8" style={{ transition: "all 0.3s ease-in-out"}}>
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

          <Link href={`/blog/${blog.slug}`}>
            <h2 className="mb-4 cursor-pointer text-4xl font-bold leading-tight">
              {blog.title}
            </h2>
          </Link>

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
                <EyeIcon size={18} />
                <span>{blog?.viewedBy.length}</span>
              </div>
            </div>

            <div
              onClick={handleSave}
              className="flex items-center gap-4 text-gray-500"
            >
              {isSaved ? <Bookmark className={'fill-black text-black cursor-pointer'} size={20} /> : <Bookmark className={'cursor-pointer'} size={20} />}

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
