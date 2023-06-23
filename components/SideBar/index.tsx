import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Youtube from "../../public/svg/youtube.svg";
import Instagram from "../../public/svg/instagram.svg";
import Tiktok from "../../public/svg/tiktok.svg";
import Twitter from "../../public/svg/twitter.svg";
import linkedin from "../../public/svg/linkedin.svg";
import Arrow from "../../public/svg/arrow.svg";
import Rewrite from "../../public/svg/Rewrite.svg";
import Save from "../../public/svg/Save.svg";

interface Props {
  children: JSX.Element;
}

const SideBar = ({ children }: Props) => {
  const { data, status } = useSession();
  const [click, setClick] = useState(true);

  if (status === "loading") return <h1> loading... please wait</h1>;

  if (status === "unauthenticated") {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase">
        Next.js sidebar menu
      </header> */}
      <div className="flex md:flex-row flex-1">
        <aside
          className={
            click
              ? "bg-blue-800 w-60 duration-500"
              : "bg-blue-800 w-28  duration-500"
          }
        >
          {/* Sidebar Header */}
          <Link
            href={"/"}
            className={
              click
                ? "flex pl-5 pt-5 pb-5 border-b-2 border-blue-500"
                : "flex pl-0 pt-5 pb-5 border-b-2 border-blue-500 justify-center"
            }
          >
            <h1
              className={
                click
                  ? "text-2xl text-white"
                  : "text-[18px] items-center text-white"
              }
            >
              Metridash
            </h1>
          </Link>
          {/* Navigation */}
          <div
            className={
              click
                ? "flex flex-col pt-5 pl-4 gap-7"
                : "flex flex-col pt-5 pl-2 gap-7"
            }
          >
            <div className="flex flex-col gap-7">
            <Link
               href="/Generate"
               >
              <h1 className={click ? "text-lg text-white" : "text-[12px]"}>Generate Content</h1>
              </Link>
              <Link
               href="/generate/youtube"
               >
              <div className="flex gap-x-2">
              <Image className={click ? "w-6 h-6" : "w-10 h-10"} src={Youtube} alt="YouTube Logo" />
                <p className={click ? "text-left text-white" : "hidden"}>YouTube</p>
              </div>
              </Link>
              <Link href="/generate/instagram">
                <div className="flex gap-x-2">
                  <Image
                    className={click ? "w-6 h-6" : "w-10 h-10"}
                    src={Instagram}
                    alt="Instagram Logo"
                  />

                  <p className={click ? "text-left text-white" : "hidden"}>
                    Instagram
                  </p>
                </div>
              </Link>
              <Link href="/generate/tiktok">
                <div className="flex gap-x-2">
                  <Image
                    className={click ? "w-6 h-6" : "w-10 h-10"}
                    src={Tiktok}
                    alt="Tiktok Logo"
                  />

                  <p className={click ? "text-left text-white" : "hidden"}>
                    Tiktok
                  </p>
                </div>
              </Link>
              <Link href="/generate/twitter">
                <div className="flex gap-x-2">
                  <Image
                    className={click ? "w-6 h-6" : "w-10 h-10"}
                    src={Twitter}
                    alt="Twitter Logo"
                  />
                  <p className={click ? "text-left text-white" : "hidden"}>
                    Twitter
                  </p>
                </div>
              </Link>
              <Link href="/generate/linkedin">
                <div className="flex gap-x-2">
                  <Image
                    className={click ? "w-6 h-6" : "w-10 h-10"}
                    src={linkedin}
                    alt="linkedin Logo"
                  />
                  <p className={click ? "text-left text-white" : "hidden"}>
                    LinkedIn
                  </p>
                </div>
              </Link>
            </div>
            <Link href="/rewrite">
              <div className="flex items-center gap-x-2">
                <Image
                  className={click ? "w-6 h-6" : "w-10 h-10"}
                  src={Rewrite}
                  alt="linkedin Logo"
                />

                <p
                  className={click ? "text-left text-white text-lg" : "hidden"}
                >
                  Rewrite Content
                </p>
              </div>
            </Link>
            <Link href="/rewrite">
            <div className="flex items-center gap-x-[13px] ml-[3px]">
            <Image className={click ? "w-[17px] h-[17px]" : "w-8 h-8 pl-1"} src={Save} alt="linkedin Logo" />
            <p className={click ? "text-left text-white text-lg" : "hidden"}>Saved Content</p>
            </div>
            </Link>
          </div>
          <button className={click ? "rotate-180 absolute left-52 bottom-[50%]" : "absolute left-20 bottom-[50%] w-52 h-52"}
             onClick={() => setClick(!click)}
              >
                <Image className={click ? "w-6 h-6 duration-500" : "w-5 h-5 duration-500"} src={Arrow} alt="Arrow Logo" />
          </button>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default SideBar;
