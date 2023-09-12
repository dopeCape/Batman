import Image from "next/image"
import React, { useState, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase"
import { useInView } from "react-intersection-observer"
import Image7 from "../../../../public/Images/7.png"
import Image8 from "../../../../public/Images/8.png"
import Image9 from "../../../../public/Images/9.png"
import Image10 from "../../../../public/Images/10.png"
const Journey = () => {
  const [email, setEmail] = useState("")
  const [response, setResponse] = useState("")
  const [disabled, setDisabled] = useState(false)

  const year = new Date().getFullYear()

  const textScrollVariants = {
    visible: { opacity: 1, right: 0 },
    hidden: { opacity: 0 },
  }

  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const subscribe = async (e: any) => {
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
    <>
      <div className="bg-[#3247CF] h-[587px] flex flex-col gap-y-10 justify-center items-center">
        <motion.h1
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="font-semibold text-[48px] leading-[48px] text-center md:w-[425px] relative md:right-[-200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          CREATED FOR YOU, WITH YOU!
        </motion.h1>
        <div className="hidden md:flex mr-[5%]">
          <Image
            className="w-[36px] h-[36px] absolute"
            src={Image7}
            alt="JourneyImg"
          />
          <Image
            className="w-[36px] h-[36px] absolute ml-[22px]"
            src={Image8}
            alt="JourneyImg"
          />
          <Image
            className="w-[36px] h-[36px] absolute ml-[45px]"
            src={Image9}
            alt="JourneyImg"
          />
          <Image
            className="w-[36px] h-[36px] absolute ml-[70px]"
            src={Image10}
            alt="JourneyImg"
          />
        </div>
        <motion.p
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="text-[16px] leading-[18.75px] font-normal text-white mt-10 w-[280px] text-center relative md:right-[200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          Join us on our journey of simplifying social media and get early
          access to new, game-changing features.
        </motion.p>
        {response && <p className="text-center">{response}</p>}
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="flex gap-x-5 relative md:right-[-200px] transition-all duration-1000 ease-in-out md:flex-row flex-col"
          animate={controls}
        >
          <form onSubmit={subscribe}>
            <input
              placeholder="Enter your Email here"
              className="bg-[#3247CF] border-white border-[1px] border-t-0 border-r-0 md:w-[400px] text-white border-l-0 h-12 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <button
              disabled={disabled}
              className={`w-full bg-[#1E1E1E] h-[51px] flex justify-center items-center  rounded-lg mt-5 ${
                disabled && "cursor-not-allowed"
              } `}
              type="submit"
            >
              <p className="text-white underline underline-offset-auto">
                Subscribe
              </p>
            </button>
          </form>
        </motion.div>
      </div>
      <div className="h-10 bg-blue-800 flex justify-center items-center">
        <p className="text-[#FFFFFF7B] text-[16px] font-normal ">
          Copyright {year} Metridash
        </p>
      </div>
    </>
  )
}

export default Journey
