import React from 'react'
import SideBar from '@/components/SideBarComponent'
import GPTResponse from '@/components/GPTRespone'
import { platformAtom } from '@/utils/store'
import { useAtom } from 'jotai'
import GPTResponseVideo from '@/components/GPTResponseVideo'

export default function HomePage() {
  const [platformAt] = useAtom(platformAtom)
  return (
    <div className='flex flex-row w-screen h-screen'>
        <div className='flex w-6/12 h-full'>
          <SideBar></SideBar>
        </div>
        <div className='flex w-6/12 h-full'>
          {platformAt=="Youtube Video"?<GPTResponseVideo></GPTResponseVideo>:
          <GPTResponse></GPTResponse>}
        </div>
    </div>
  )
}

