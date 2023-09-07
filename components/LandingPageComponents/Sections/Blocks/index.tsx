import Image from "next/image"
import React, { useState, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase"
import DashBoard from "../../../../public/Images/1.png"
import Link from "next/link"
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

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])
  
  return (
    <div className="bg-[#3247CF] flex pl-[7%] pb-5 w-full md:flex-row flex-col items-center  ">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <h1 className="font-semibold text-6xl leading-[92%] w-[408px] text-white mt-4">
        Never Face Creative Blocks Again!
        </h1>
        <p className="text-white self-center text-left font-normal text-md leading-[28px] mt-4">
        Are you tired of staring at a blank screen, struggling to come up with content ideas for your social media?<br/>  Look no further! Metridash is here to revolutionize your creative process.
        </p>
        {response && <p>{response}</p>}

       <Link href={'/auth/signup'} className="flex w-40 px-2 py-2 mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl items-center justify-center">
              <h1>Sign up</h1>
       </Link>
      </motion.div>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="w-full mt-5 relative top-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <Image
          className="lg:flex hidden w-full object-cover"
          src={DashBoard}
          alt="DashBoard"
        />
      </motion.div>
    </div>
  )
}

export default Blocks
