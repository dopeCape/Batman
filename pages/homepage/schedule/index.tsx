import React from "react"
import checkUser from "@/utils/checkUser"

export default function Schedule() {
  const user: any = checkUser()
  if (!user) {
    window.location.href = "/auth/signin"
    return
  }
  return (
    <h3 className="font-semibold mt-4 text-5xl flex justify-center items-center min-h-[calc(100vh-8rem)]">
      Coming Soon...
    </h3>
  )
}
