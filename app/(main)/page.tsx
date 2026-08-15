"use client";
import BlogCard from "@/components/ui/BlogCard";
import { useEffect } from "react";
import useBlogStore from "@/store/useBlogStore";

export default function Home() {
  const { fetchAllBlogs, blogs } = useBlogStore();

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);
  return (
    <div
      className={
        "w-240 justify-self-center h-screen pb-2 overflow-scroll flex items-center justify-center"
      }
    >
      <div className={"w-200 h-full grid-cols-1 overflow-scroll py-10"}>
        {blogs?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-semibold text-gray-700">No posts yet</p>
            <p className="text-gray-500 mt-1">
              Be the first one to share your story!
            </p>
          </div>
        ) : (
          blogs?.map((blog, index) => <BlogCard key={index} blog={blog} />)
        )}
      </div>
    </div>
  );
}
