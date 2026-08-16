"use client";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import "../globals.css";
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import useUiStore from "@/store/useUiStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useUiStore();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex w-full h-full overflow-hidden">
        <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>

        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
