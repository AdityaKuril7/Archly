"use client";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import useUiStore from "@/store/useUiStore";
import { AnimatePresence } from "framer-motion";
import BlogCard from "@/components/ui/BlogCard";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";

export default function Home() {
  const { isSidebarOpen } = useUiStore();
  const { fetchAllBlogs, blogs } = useBlogStore();

  useEffect(() => {
    fetchAllBlogs();
  }, []);
  return (
    <div className={"h-screen w-screen flex flex-col overflow-hidden"}>
      <Navbar />
      <main className={" w-full h-full grid grid-cols-3 overflow-scroll "}>
        <div className="justify-self-start">
          <AnimatePresence mode="wait">
            {isSidebarOpen && <Sidebar />}
          </AnimatePresence>
        </div>

        <div
          className={
            "w-240 justify-self-center h-full flex items-center justify-center"
          }
        >
          <div className={"w-200 h-full grid-cols-1 overflow-scroll py-10"}>
            {blogs?.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>
        <div />
      </main>
    </div>
  );
}
