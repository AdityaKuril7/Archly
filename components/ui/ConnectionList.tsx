"use client"
import {Label} from "@/components/ui/label";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import ListItems from "@/components/ui/ListItems";
import React, {useEffect} from "react";
import useProfileStore from "@/store/useProfileStore";

export function ConnectionList({isForFollowers,setActiveTab}:{isForFollowers:boolean,setActiveTab: React.Dispatch<React.SetStateAction<string | null>>}) {
  const {connections,fetchConnections,loading} = useProfileStore()
  const listKey = isForFollowers ? "followers" : "following"



  useEffect(() => {
    fetchConnections(isForFollowers ? "followers" : "following")
  }, []);




  return(
    <div className={'h-screen w-screen bg-black/30 absolute top-0 left-0 backdrop-blur-md flex items-center justify-center'}>
      <div className={'bg-white h-150 w-150 flex flex-col p-5 rounded-xl '}>

        <div className={'flex justify-between items-center '}>
          <Label className={'text-xl font-semibold'}>{isForFollowers ? "Followers":"Following"}</Label>

          <Button onClick={()=> setActiveTab(null)} variant={'destructive'}>
            Close
          </Button>
        </div>

        <div className={'flex flex-col mt-3 overflow-scroll '}>
          {loading ? <Label>Loading...</Label> :  connections?.flatMap((conn)=>
            conn[listKey]?.map((user,index)=>(
              <ListItems key={user._id} user={user} isForFollowers={isForFollowers} />
            ))
          )}
        </div>


      </div>
    </div>
  )
}