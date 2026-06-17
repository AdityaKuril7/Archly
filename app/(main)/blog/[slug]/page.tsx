"use client"
import {use, useEffect} from "react";
import useBlogStore from "@/store/useBlogStore";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";

export default function BlogPage({params}:{params: Promise<{slug:string}>}) {
  const {slug} = use(params);
  const {blog,fetchBlog} = useBlogStore()

  useEffect(() => {
   fetchBlog(slug);
    console.log(blog)
  }, []);


  return (
    <div className={'w-200 h-[90vh]  justify-self-center flex flex-col items-center overflow-scroll'} >
      <header className={' h-auto w-full p-5 flex items-center justify-center flex-col gap-4'}>

        <Label className={'text-4xl font-bold text-gray-800'}>{blog?.title}</Label>
        <Label className={'text-lg text-gray-500'}>{blog?.excerpt}</Label>

        <div className={'self-start w-full h-auto flex items-center justify-between'}>

          <div className={' h-auto flex items-center gap-3'}>
            <div className={'w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center'}>
              <Label>{blog?.author.username[0]}</Label>
            </div>
            <Label className={'text-[17px]'}>{blog?.author.username}</Label>
            <Button variant={'outline'} className={'text-sm border-gray-400'}>
              Follow
            </Button>
          </div>

          <div className={'flex items-center gap-5'}>
            <Label className={' text-gray-800'}>{blog?.category}</Label>
            <Label>
              {new Date(blog?.createdAt as string).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Label>
          </div>
        </div>
        <div className={'w-full overflow-hidden rounded-lg'}>

          <motion.img
            initial={{scale:1.45}}
            animate={{scale:1}}
            transition={{duration:1,ease:"easeInOut"}}
            src={blog?.image} alt="blog" className={'w-full h-auto rounded-lg'}/>
        </div>
      </header>

      <main className="min-h-screen w-full p-5">
        <div
          className="prose max-w-none text-[20px] font-serif break-words hyphens-none"
          dangerouslySetInnerHTML={{ __html: blog?.content || "Not Specified" }}
        />
      </main>

    </div>
  )
}