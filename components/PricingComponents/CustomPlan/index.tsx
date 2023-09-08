import React from "react"
import { BsHandbag } from "react-icons/bs"
import classes from "./CustomPlan.module.css"
import Link from "next/link"

function CustomPlan() {
  return (
    // <div className='flex flex-col w-[500px] py-0 items-center '>
    <div className={`${classes.free_trial} flex flex-col py-0 items-center`}>
      <div className="flex flex-col w-[100%] py-10 items-center ">
        <h1 className="text-[#101827] font-bold text-3xl">Custom Plan</h1>
        <p className="font-semibold py-2 text-[#4b5563] text-[23px] w-[100%] text-center ">
          For teams and businesses
        </p>
        <p className="w-[65%] text-[#838995] text-[20px] text-center font-medium">
          Take your business to the next level with custom packages, custom AI
          model development, onboarding, and support.
        </p>
        <div className="flex items-center justify-center">
          <BsHandbag className="w-20 h-20 mt-20 text-[#101827]" />
        </div>
      </div>
      <div className="border-gray-200 cursor-pointer text-[20px] text-[#705cf6] font-bold border-[1px] p-5 px-10 rounded-[10px] ">
        <Link href="/contact">Contact Sales</Link>
      </div>
    </div>
  )
}

export default CustomPlan
