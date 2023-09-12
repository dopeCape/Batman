import React from "react"
import classes from "./FreeTrial.module.css"
import Link from "next/link"

function FreeTrial() {
  return (
    <div className="flex flex-col w-[500px] items-center ">
      <div className="flex flex-col  w-[100%] py-10 items-center ">
        <h1 className="text-[#101827] font-bold text-3xl">Free Trial</h1>
        <p className="font-medium py-2 text-[#4b5563] text-[23px] w-[60%] text-center ">
          Give Metridash a try for free
        </p>
        <p className="w-[65%] text-[#838995] text-[20px] text-center font-medium">
          Free trial of Metridash features to help you get a taste of AI
          writing.
        </p>
        <div className="flex flex-col h-[450px] items-center">
          <h1 className="py-20 text-5xl text-[#101827] font-bold">$0</h1>
          <p className="w-[60%] text-[#4b5563] text-[22px] text-center font-medium">
            Try out all features to determine what works best for you
          </p>
          <div className="flex items-center  gap-x-5 py-10">
            {/* <p className='text-[#101827] font-bold text-xl'>1,250 words/month</p> <span className='text-[#4b5563] font-medium text-xl'>1 seats</span> */}
            <p className="text-[#101827] font-bold text-xl">100 Tokens/month</p>{" "}
          </div>
          <div className="flex items-center  gap-x-5 mb-4">
            {/* <p className='text-[#101827] font-bold text-xl'>1,000 words/month</p> <span className='text-[#4b5563] font-medium text-xl'>1 seats</span> */}
            <p className="text-[#101827] font-bold text-xl">
              10,000 Words/month
            </p>{" "}
          </div>
          {/* <p className='text-[#101827] font-bold text-xl'>10,000 words/month</p> <span className='text-[#4b5563] font-medium text-xl'>1 seats</span> */}
        </div>
      </div>
      {/* <div className='border-gray-200 cursor-pointer text-[20px] text-[#a99efa] font-bold border-[1px] p-5 px-10 rounded-[10px] '> */}
      <button
        className={`border-gray-200 cursor-pointer text-[20px] text-[#705cf6]  font-bold border-[1px] p-5 px-10 rounded-[10px]`}
      >
        <Link href="/auth/signup">Get Started Free</Link>
      </button>
    </div>
  )
}

export default FreeTrial
