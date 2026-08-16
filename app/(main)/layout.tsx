"use client";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import "../globals.css";
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import useUiStore from "@/store/useUiStore";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useUiStore();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />

      <div
        className={`grid ${isSidebarOpen ? "grid-cols-2" : "grid-cols-3"} w-full h-full`}
      >
        <div className="justify-self-start">
          <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
