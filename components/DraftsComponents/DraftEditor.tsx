import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useAtom } from "jotai";
import Image from 'next/image';
import { draftAtom } from "@/utils/store";
import { useEffect } from 'react';
import { IoCopy , IoCopyOutline, IoCopySharp} from 'react-icons/io5';
import { Button } from '@mui/material';
export default function DraftEditor() {

  const [draft, setDraft] = useAtom(draftAtom);
  const [data, setData ] = useState('')
  useEffect(()=>{
    setData(draft)
  },[draft])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update the draftAtom when the textarea content changes
    setDraft(event.target.value);
  };

  function copyText(entryText: string) {
    
    navigator.clipboard.writeText(entryText);
   
  }

  return (
    <div className='flex w-full h-screen dark:bg-[#1C1C1C] bg-white md:px-20 md:pt-10 md:pb-28 px-4 py-4'>
      <div className='flex flex-col dark:bg-[#1B1D21] bg-[#F2F2F2] h-full w-full border dark:border-[#33363C] rounded '>
      <textarea  value={draft} 
          onChange={handleChange} className=' w-full h-full outline-none dark:bg-[#1B1D21] bg-[#F2F2F2] px-2 py-2'></textarea>
     <Button onClick={()=>copyText(draft)} className='self-end m-2'>
      <IoCopyOutline className='self-end m-2'></IoCopyOutline>

     </Button>
      </div>
    </div>
  )
}
