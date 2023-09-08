import React from "react"
import SideBar from "@/components/SideBarComponent"
import GPTResponse from "@/components/GPTRespone"
import { platformAtom } from "@/utils/store"
import { useAtom } from "jotai"
import GPTResponseVideo from "@/components/GPTResponseVideo"
import checkUser from "@/utils/checkUser"

export default function ContentCreation() {
  const [platformAt] = useAtom(platformAtom)
  const user: any = checkUser()
  if (!user) {
    window.location.href = "/auth/signin"
    return
  }
  return (
    <div className="flex flex-col w-screen h-screen md:flex-row">
      <div className="flex md:w-6/12 w-screen  h-full">
        <SideBar></SideBar>
      </div>
      <div className="flex md:w-6/12 w-screen h-full">
        {/* {platformAt=="Youtube Video" || platformAt=="Youtube Shorts" || platformAt=="Instagram Reels" || platformAt=="TikTok Video"?<GPTResponseVideo></GPTResponseVideo>: */}
        <GPTResponse></GPTResponse>
      </div>
    </div>
  )
}
