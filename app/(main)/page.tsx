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
        {blogs?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}
