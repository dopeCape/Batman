import React from 'react'
import RPreviewImg from "../../../../public/Images/talking.png"
import Image from "next/image"
import Link from "next/link"
export default function Testimonials() {
  return (
    <div className='flex w-full md:px-20 px-4 pt-20 pb-10 border-b-2 border-gray-600 gap-y-4  items-center flex-col'>
        <h1 className='text-white text-3xl font-semibold'>Join a Thriving Community of Creators</h1>
        <p>Connect. Collaborate. Grow Together.</p>
        <Image
            src={RPreviewImg}
            alt="Preview"
            className=" flex object-contain w-40 h-40"
           
          />
          <div className="btn-hero md:ml-5">
          <Link
            href={`/auth/signup`}
            className="flex px-2 py-2 mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl items-center justify-center"
          >
            <h1 className="text-lg font-semibold">Join the Community</h1>
          </Link>
        </div>
    </div>
  )
}
