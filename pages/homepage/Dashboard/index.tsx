import React from "react"
import SideBar from "@/components/SideBarComponent"
import checkUser from "@/utils/checkUser"

export default function Dashboard() {
  const user: any = checkUser()
  if (!user) {
    window.location.href = "/auth/signin"
    return
  }
  return (
    <h3 className="font-semibold  text-5xl flex justify-center mt-64 min-h-[calc(100vh-8rem)]">
      Coming Soon...
    </h3>
  )
}
