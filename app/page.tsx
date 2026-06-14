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
  const { fetchAllBlgos, blogs } = useBlogStore();

  useEffect(() => {
    fetchAllBlgos();
  }, []);
  return (
    <div className={"h-screen w-screen flex flex-col overflow-hidden"}>
      <Navbar />
      <main className={"flex w-full h-full"}>
        <AnimatePresence mode="wait">
          {isSidebarOpen ? <Sidebar /> : <div className={"w-65"} />}
        </AnimatePresence>

        <div className={"w-240 h-full flex items-center justify-center"}>
          <div className={"w-200 h-full grid-cols-1 overflow-scroll py-10"}>
            {blogs?.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
