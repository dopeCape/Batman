import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Logout } from '@/auth';
import { useTheme } from 'next-themes';
export default function LoginNavBar() {
    const {theme, setTheme} = useTheme();
    const router = useRouter();
    const handleLogout = async () => {
        try {
          await Logout();
          alert("User logged out successfully!");
          router.push("/");
        } catch (err) {
          console.error(err);
        }
      };
  return (

    <div className='w-screen h-20 bg-slate-400 flex flex-row items-center justify-evenly'>
        
        <Link href='/homepage'>Dashboard</Link>
        <Link href='/homepage/contentCreation'>Content creation</Link>
        <Link href='/homepage/schedule'>Schedule</Link>
        <Link href='/homepage/drafts'>Drafts</Link>
        <span onClick={()=>setTheme("dark")}>Dark</span> |
        <span  onClick={()=>setTheme("light")}>Light</span> | {theme}
        <div
                className="text-white font-bold cursor-pointer"
              onClick={() => {
                handleLogout();
              }}
            >
              <Link href="/">Log out</Link>
            </div>
    </div>
  )
}
