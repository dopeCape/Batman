import Image from "next/image"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase"
import DashBoard from "../../../../public/Images/Desktop.png"
import checkUser from "@/utils/checkUser"

const Blocks = () => {
  const textScrollVariants = {
    visible: { opacity: 1, top: 0 },
    hidden: { opacity: 0 },
  }
  const [email, setEmail] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [response, setResponse] = useState("")
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const user: any = checkUser()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div className="bg-[#3247CF] flex md:px-0 px-3 pb-5 w-full md:flex-row flex-col items-center">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="flex flex-col gap-y-8 justify-center relative top-[-20px] transition-all duration-1000 w-full ease-in-out"
        animate={controls}
      >
        <h1 className="font-semibold text-[48px] md:text-[64px] leading-[90%] md:w-full text-white mt-0 md:pl-14">
          Never Face Creative Blocks Again!
        </h1>
        <p className="text-white md:w-full font-normal text-[20px] leading-[28px] md:pl-14">
        Are you tired of staring at a blank screen, struggling to come up with content ideas for your social media? Look no further! Metridash is here to revolutionise your creative process.
        </p>
        <div className="btn-hero md:ml-10 flex items-start pl-[16px] justify-center flex-col gap-y-2 md:w-60 w-full">
          <Link
            href={`${user && user.uid ? "/homepage" : "/auth/signup"}`}
            className="flex  px-4 py-2 mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl items-center justify-center"
          >
            <h1 className="text-lg font-semibold">Try for free</h1>
          </Link>
          <h1 className="text-xs font-light text-gray-300">30 day trial. No credit card required.</h1>
        </div>
      </motion.div>
      <div
        ref={ref}
        
       
        className="w-full mt-12 relative top-[-50px] transition-all duration-1000 ease-in-out"
       
      >
        <Image
          className="lg:flex hidden w-full object-cover"
          src={DashBoard}
          alt="DashBoard"
        />
      </div>
    </div>
  )
}

export default Blocks
