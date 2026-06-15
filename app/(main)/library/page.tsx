"use client";
import BlogCard from "@/components/ui/BlogCard";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import React, { useEffect, useState } from "react";

const Library = () => {
  const { getUserId } = useAuthStore();
  const { savedBlogs, fetchLibrary } = useBlogStore();

  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;
    fetchLibrary(userId);
  }, []);

  return (
    <div
      className={
        "w-240 justify-self-center h-screen pb-2 overflow-scroll flex items-center justify-center"
      }
    >
      <div className={"w-200 h-full grid-cols-1 overflow-scroll py-10"}>
        {savedBlogs?.length == 0 ? (
          <div className="w-full h-100 flex items-center justify-center">
            <Label>No saves</Label>
          </div>
        ) : (
          savedBlogs?.map((blog, index) => <BlogCard blog={blog} key={index} />)
        )}
      </div>
    </div>
  );
};

export default Library;
