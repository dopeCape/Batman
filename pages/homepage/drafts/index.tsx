import React from 'react'
import DraftEditor from '@/components/DraftsComponents/DraftEditor'
import DraftSidebar from '@/components/DraftsComponents/DraftSidebar'
export default function Drafts() {
  return (
    <div className='flex w-screen h-screen md:flex-row flex-col'>
      <div className='flex md:w-2/5 w-full h-full'>
        <DraftSidebar></DraftSidebar>
      </div>
      <div className='flex md:w-3/5 w-full h-full'>
        <DraftEditor></DraftEditor>
      </div>
    </div>
  )
}
