"use client"
import {HomeIcon, LayoutDashboardIcon, LibraryIcon, UserIcon} from "lucide-react";
import {motion} from "framer-motion"
import {Label} from "@/components/ui/label";

export default function Sidebar() {
  const sideBarOptions = [
    {
      title: "Home",
      icon: <HomeIcon />,
    },
    {
      title: "Library",
      icon: <LibraryIcon />,
    },
    {
      title: "Profile",
      icon: <UserIcon />,
    },
    {
      title: "Dashboard",
      icon: <LayoutDashboardIcon />
    }
  ]
  return(
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className={'w-65 h-full border-r border-gray-300 p-8 '}>
      {sideBarOptions.map((option,index) => (
        <div key={index} className={'flex gap-4 w-full h-10 items-center text-gray-800 hover:text-black '}>
          {option.icon}
          <Label className={'text-xl cursor-pointer text-gray-600 hover:text-black transition-all duration-500 ease-in-out'}>{option.title}</Label>
        </div>
      ))}
    </motion.div>
  )
}