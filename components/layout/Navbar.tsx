import {Label} from "@/components/ui/label";
import {MenuIcon, PenBox, Search} from "lucide-react";

export default function Navbar() {

  return (

    <nav className={'h-20 w-full border-b p-5 flex justify-between items-center border-gray-200'}>
      <div className={'flex gap-5'}>

        <div className={'flex items-center gap-4'}>
          <MenuIcon/>
          <Label className={'text-2xl font-black'}>Archly</Label>
        </div>

        <div className={'w-70 bg-gray-100/80 flex items-center p-3 gap-3 rounded-full'}>
          <Search/>
          <input type="text" placeholder={'search'} className={'w-full h-full focus:outline-none'}/>
        </div>
      </div>
      <div className={'h-full w-auto flex items-center gap-5'}>
        <div className={'flex gap-1 items-center'}>
          <PenBox className={'text-gray-700 h-5'} />
          <Label className={'text-sm'}>Write</Label>
        </div>

        {/* Avatar */}
        <div className={'h-10 w-10 bg-yellow-200 rounded-full flex items-center justify-center'}>
          <Label>A</Label>
        </div>

      </div>
    </nav>
  )
}