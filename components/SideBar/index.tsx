import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  children: JSX.Element;
}

const SideBar = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    console.log("Sidebar router", router);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase">
        Next.js sidebar menu
      </header> */}
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-blue-900 w-full md:w-60">
          {/* Sidebar Header */}
          <Link
            href={"/"}
            className="flex justify-center pt-5 pb-5 border-b-2 border-blue-500"
          >
            <h1 className="text-2xl text-white">Metridash</h1>
          </Link>
          {/* Navigation */}
          <div className="flex flex-col pt-5 pl-4 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-lg">Generate Content</h1>
              <Link
                href="/generate/youtube"
                className="pl-4 text-left text-white"
              >
                Youtube
              </Link>
              <Link
                href="/generate/instagram"
                className="pl-4 text-left text-white"
              >
                Instagram
              </Link>
              <Link
                href="/generate/tiktok"
                className="pl-4 text-left text-white"
              >
                Tiktok
              </Link>
              <Link
                href="/generate/twitter"
                className="pl-4 text-left text-white"
              >
                Twitter
              </Link>
              <Link
                href="/generate/linkedin"
                className="pl-4 text-left text-white"
              >
                LinkedIn
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/rewrite" className="text-left text-white text-lg">
                Rewrite Content
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/rewrite" className="text-left text-white text-lg">
                Saved Content
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default SideBar;
