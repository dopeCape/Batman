// import React, { useState } from 'react'
// import TextField from '@mui/material/TextField';
// import { useAtom } from "jotai";
// import Image from 'next/image';
// import { draftAtom } from "@/utils/store";
// import { useEffect } from 'react';
// import { IoCopy , IoCopyOutline, IoCopySharp} from 'react-icons/io5';
// import { Button } from '@mui/material';
// export default function DraftEditor() {

//   const [draft, setDraft] = useAtom(draftAtom);
//   const [data, setData ] = useState()
//   useEffect(()=>{
//     setData(draft)
//   },[draft])

//   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     // Update the draftAtom when the textarea content changes
//     setDraft(event.target.value);
//   };

//   function copyText(entryText: string) {
    
//     navigator.clipboard.writeText(entryText);
   
//   }

//   return (
//     <div className='flex w-full h-full dark:bg-[#1C1C1C] bg-white px-20 pt-10 pb-28'>
//       <div className='flex flex-col dark:bg-[#1B1D21] bg-[#F2F2F2] h-full w-full border dark:border-[#33363C] rounded '>
//       <textarea  value={draft?.draft} 
//           onChange={handleChange} className=' w-full h-full outline-none dark:bg-[#1B1D21] bg-[#F2F2F2] px-2 py-2'></textarea>
//      <Button onClick={()=>copyText(draft?.draft)} className='self-end m-2'>
//       <IoCopyOutline className='self-end m-2'></IoCopyOutline>

//      </Button>
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useAtom } from 'jotai';
import { draftAtom } from '@/utils/store';
import { IoCopyOutline } from 'react-icons/io5';
import { Button } from '@mui/material';

interface Draft {
  draft: string;
  time: string;
  platform: string;
}

export default function DraftEditor() {
  const [draft, setDraft] = useAtom(draftAtom);
  const [data, setData] = useState<string>(draft?.draft || '');

  useEffect(() => {
    setData(draft?.draft || '');
  }, [draft]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update the draftAtom when the textarea content changes
    setDraft({
      ...draft!,
      draft: event.target.value,
    });
  };

  function copyText(entryText: string) {
    navigator.clipboard.writeText(entryText);
  }

  return (
    <div className="flex w-full h-full dark:bg-[#1C1C1C] bg-white px-20 pt-10 pb-28">
      <div className="flex flex-col dark:bg-[#1B1D21] bg-[#F2F2F2] h-full w-full border dark:border-[#33363C] rounded">
        <textarea
          value={data}
          onChange={handleChange}
          className="w-full h-full outline-none dark:bg-[#1B1D21] bg-[#F2F2F2] px-2 py-2"
        ></textarea>
        <Button onClick={() => copyText(data)} className="self-end m-2">
          <IoCopyOutline className="self-end m-2"></IoCopyOutline>
        </Button>
      </div>
    </div>
  );
}
