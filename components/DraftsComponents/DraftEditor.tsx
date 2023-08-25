import React from 'react'
import TextField from '@mui/material/TextField';

import { IoCopy , IoCopyOutline, IoCopySharp} from 'react-icons/io5';
export default function DraftEditor() {
  return (
    <div className='flex w-full h-full bg-[#1C1C1C] px-20 pt-10 pb-28'>
      <div className='flex flex-col bg-[#1B1D21] h-full w-full border border-[#33363C] rounded '>
      <textarea className=' w-full h-full outline-none bg-[#1B1D21] px-2 py-2'></textarea>
      <IoCopyOutline className='self-end m-2'></IoCopyOutline>
      </div>
    </div>
  )
}
