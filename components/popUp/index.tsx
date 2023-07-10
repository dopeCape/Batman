import Link from 'next/link'
import React from 'react'
import { getUserToken } from '../../auth';
export default function PopUp() {
  return (
    <div
            className="flex flex-col items-center justify-center p-4 w-full h-full bg-white rounded-xl shadow-xl" 
           
          >
            <h3 className='text-black font-semibold text-center text-lg'>You've run out of credits :(</h3>
            <p className='text-gray-600 text-center text-sm'>You won't be able to generate any more content.</p>
            <p className='text-gray-600 text-center mb-4 text-sm'>Don't worry, your current content is still safe.</p>
            <p className='text-gray-600 text-center'>To keep generating great content, upgrade your plan.</p>
            <Link
              href="/pricing"
              className='w-3/4 text-white text-center py-2 rounded-lg my-4 bg-gradient-to-l from-[#009FFD] to-[#2A2A72]'
            >
              <h1 className='text-center'>View Plans</h1>
            </Link>{" "}
            
            <a
              href="/"
              style={{
                color: "#009ffd",
                fontSize: "0.8rem",
                fontWeight: "bolder",
                textDecoration: "none"
              }}
            >
              Want to earn more credits?
            </a>
          </div>
        
  )
}