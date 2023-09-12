import React from "react"
import DraftEditor from "@/components/DraftsComponents/DraftEditor"
import DraftSidebar from "@/components/DraftsComponents/DraftSidebar"
export default function Drafts() {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen flex-row">
      <div className="flex w-full md:w-2/5 h-full">
        <DraftSidebar></DraftSidebar>
      </div>
      <div className="flex w-full md:w-3/5 h-full">
        <DraftEditor></DraftEditor>
      </div>
    </div>
  )
}
