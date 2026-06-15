"use client";
import {
  HomeIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  LogOut,
  PenBox,
  UserIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Sidebar() {
  const sideBarOptions = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      title: "Write",
      icon: <PenBox />,
      link: "/createpost",
    },
    {
      title: "Library",
      icon: <LibraryIcon />,
      link: "/library",
    },
    {
      title: "Profile",
      icon: <UserIcon />,
      link: "/user-profile",
    },
    {
      title: "Dashboard",
      icon: <LayoutDashboardIcon />,
      link: "#",
    },
    {
      title: "Logout",
      icon: <LogOut />,
      link: "/auth",
    },
  ];
  return (
    <motion.div
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      exit={{ x: -260 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={
        "w-65 h-full border-r self-start border-gray-300 p-8 flex flex-col gap-5 "
      }
    >
      {sideBarOptions.map((option, index) => (
        <motion.div key={index} whileHover={{ scale: 1.1, translateX: 10 }}>
          <Link
            href={option.link}
            key={index}
            className={
              "flex gap-4 w-full h-10 items-center text-gray-800 hover:text-black "
            }
          >
            {option.icon}
            <Label
              className={
                "text-xl cursor-pointer text-gray-600 hover:text-black transition-all duration-500 ease-in-out"
              }
            >
              {option.title}
            </Label>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
