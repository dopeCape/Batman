import React from 'react'
import SideBar from '@/components/SideBarComponent'
export default function ContentCreation() {
  return (
    <div className='flex flex-row w-screen h-screen'>
        <div className='flex w-1/2 h-full'>
          <SideBar></SideBar>

        </div>
    </div>
  )
}
