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
} from "lucide-react";
import { use, useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BlogCard({ blog }: { blog: IBlogSchema }) {
  const { toggleLike } = useBlogStore();
  const { user } = useAuthStore();

  const [liked, setIsLiked] = useState(
    blog.likes.includes(user?._id as string),
  );

  const [likeCount, setLikeCount] = useState(blog.likes.length);

  useEffect(() => {
    setLikeCount(blog.likes.length);
    setIsLiked(blog.likes.includes(user?._id as string));
  }, [blog.likes, user?._id]);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }

    setIsLiked(!liked);

    toggleLike(blog._id, user?._id as string);
  };

  return (
    <div className="border-b pb-8 mb-8">
      <div className="flex gap-6">
        {/* Content */}
        <div className="flex-1">
          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="font-medium">{blog?.author.username}</span>

            <BadgeCheck size={16} className="text-blue-500 fill-blue-500" />

            <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold leading-tight mb-4">
            {blog?.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-xl leading-relaxed line-clamp-2">
            {blog?.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-5 text-gray-500">
              <div onClick={handleLike} className="flex items-center gap-1 cursor-pointer">
                <Hand
                  className={liked ? "text-red-500" : "text-black"}
                  size={18}
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

            <div className="flex items-center gap-4 text-gray-500">
              <Bookmark size={20} />
              <MoreHorizontal size={20} />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="w-60 h-40 shrink-0">
          <motion.img
            src={blog?.image}
            alt="blog"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
