import {HomeIcon, LayoutDashboardIcon, LibraryIcon, MenuIcon, Search, UserIcon} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function Home() {
  return (
      <div className={'h-screen w-screen flex flex-col'}>
        <Navbar />
        <main className={'flex w-full h-full'}>
          
          <Sidebar />
        </main>
      </div>
  );
}
