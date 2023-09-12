import Image from "next/image"
import React, { useState, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase"
import DashBoard from "../../../../public/Images/1.png"
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
  const joinTheWaitList = async (e: any) => {
    e.preventDefault()
    if (email.length === 0) return
    try {
      setDisabled(true)
      await addDoc(collection(db, "waitList"), {
        email,
        createdAt: serverTimestamp(),
      })
      setDisabled(false)
      setEmail("")
      setResponse("Thank you! You have successfully submitted your email.")
      setTimeout(() => {
        setResponse("")
      }, 5000)
    } catch (ex) {
      setEmail("")
      setResponse("Sorry, something went wrong.")
      setTimeout(() => {
        setResponse("")
      }, 5000)
    }
  }
  return (
    <div className="bg-[#3247CF] flex md:px-0 px-3 pb-5 w-full md:flex-row flex-col items-center">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <h1 className="font-semibold text-[48px] md:text-[64px] leading-[92%] md:w-[408px] text-white mt-4 md:pl-5">
          Never Face Creative Blocks Again!
        </h1>
        <p className="text-white md:w-[447px] font-normal text-[24px] leading-[28px] md:pl-5">
          Metridash is here to revolutionize your creative process.
        </p>
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
