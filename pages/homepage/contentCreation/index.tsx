import React from "react";
import SideBar from "@/components/SideBarComponent";
import GPTResponse from "@/components/GPTRespone";
import GPTResponseVideo from "@/components/GPTResponseVideo";

export default function ContentCreation() {
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex w-screen h-full">
        <SideBar />
        <GPTResponse />
        {/* <GPTResponseVideo /> */}
      </div>
    </div>
  );
}
