import {Label} from "@/components/ui/label";
import {MenuIcon, PenBox, Search} from "lucide-react";
import useUiStore from "@/store/useUiStore";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import useBlogStore from "@/store/useBlogStore";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function Navbar() {
  const { toggleSidebar } = useUiStore();
  const { user, fetchMe,isActive } = useAuthStore();
  const { searchBlogs, fetchAllBlogs } = useBlogStore();
  const [search, setSearch] = useState<string>("");
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    fetchMe();
  }, []);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchBlogs(search);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value === "") {
      fetchAllBlogs();
    }
  };

  return (
    <nav
      className={
        "h-20 w-full border-b sticky p-5 flex justify-between items-center border-gray-200"
      }
    >
      <div className={"flex gap-5"}>
        <div className={"flex items-center gap-4"}>
          <motion.div whileHover={{ scale: 1.1, rotateZ: 5 }}>
            <MenuIcon className="cursor-pointer" onClick={toggleSidebar} />
          </motion.div>
          <Label className={"text-2xl font-black"}>Archly</Label>
        </div>
        {isHomepage &&
            <div
                className={
                  "w-70 bg-gray-100/80 flex  items-center p-3 gap-3 rounded-full"
                }
            >
                <Search />
                <input
                    value={search}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e)}
                    type="text"
                    placeholder={"search"}
                    className={"w-full h-full focus:outline-none"}
                />
            </div>
        }

      </div>
      <div className={"h-full w-auto flex items-center gap-5"}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={"flex gap-1 items-center"}
        >
          <Link href={"/createpost"} className={"flex gap-1 items-center "}>
            <PenBox className={"text-gray-700 h-5 cursor-pointer"} />
            <Label className={"text-sm cursor-pointer"}>Write</Label>
          </Link>
        </motion.div>

        {/* Avatar */}
        {!isActive ? <Link href={"/auth"}><Button>Log in</Button></Link> :
          <Link href={`/user-profile/${user?.username}`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={
                "h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center cursor-pointer"
              }
            >
              <Label>{user?.username[0]}</Label>
              {/* <UserIcon /> */}
            </motion.div>
          </Link>
        }
      </div>
    </nav>
  );
}
