import { getSession, useSession } from "next-auth/react";
import React from "react";
import Youtube from "../../public/svg/youtube.svg"
import instagram from "../../public/svg/instagramWhite.svg"
import tiktok from "../../public/svg/tiktokWhite.svg"
import twitter from "../../public/svg/twitter.svg"
import linkedin from "../../public/svg/linkedin.svg"
import Generat_List from "./Generate_List";
import Link from "next/link";
const Generate = () => {
  const Generate_Platforms_Youtube = [[Youtube]]
  const Generate_Platforms_instagram = [[instagram]]
  const Generate_Platforms_tiktok = [[tiktok]]
  const Generate_Platforms_twitter = [[twitter]]
  const Generate_Platforms_linkedin = [[linkedin]]

  return ( 
  <div className="h-[100%] flex flex-col justify-center items-center">
    <p className="text-#fff font-bold text-2xl pb-10 text-justify tracking-wide">Generate Content</p>
    <p className="text-gray-200 font-normal w-[45%] text-justify leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam obcaecati non, autem delectus porro commodi animi id eligendi nulla eos dolore harum neque quo nobis nihil, perferendis ipsa. Alias, suscipit.</p>
    <div className="flex gap-x-10 py-10">
      <Link href="/generate/youtube">
      <Generat_List Card={Generate_Platforms_Youtube} />
      </Link>
      <Link href="/generate/instagram">
      <Generat_List Card={Generate_Platforms_instagram} />
      </Link>
      <Link href="/generate/tiktok">
      <Generat_List Card={Generate_Platforms_tiktok} />
      </Link>
      <Link href="/generate/twitter">
      <Generat_List Card={Generate_Platforms_twitter} />
      </Link>
      <Link href="/generate/linkedin">
      <Generat_List Card={Generate_Platforms_linkedin} />
      </Link>
    </div>
    <p className="text-#fff font-bold text-2xl tracking-wide">Generate your next Content</p>
  </div>
  )
}

export default Generate
