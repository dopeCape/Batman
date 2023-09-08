import Image from "next/image"
import React, { useState, useEffect } from "react"
import { addDoc, serverTimestamp, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image7 from "../../../../public/Images/7.png"
import Image8 from "../../../../public/Images/8.png"
import Image9 from "../../../../public/Images/9.png"
import Image10 from "../../../../public/Images/10.png"
import Footer from "@/components/Footer"
const Journey = () => {
  const [email, setEmail] = useState("")
  const [response, setResponse] = useState("")

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
      await addDoc(collection(db, "waitList"), {
        email,
        createdAt: serverTimestamp(),
      })
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
    <div className="flex w-screen  flex-col">
      <div className="bg-[#3247CF] w-screen  h-[587px] flex flex-col gap-y-10 justify-center items-center">
        <motion.h1
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="font-semibold text-[48px] leading-[48px] text-center w-[425px] relative right-[-200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          CREATED FOR YOU, WITH YOU!
        </motion.h1>
        <div className="flex items-center justify-center gap-x-8 ">
          <Image
            className="w-[36px] h-[36px] absolute"
            src={Image7}
            alt="JourneyImg"
          />
          <Image
            className="w-[36px] h-[36px] absolute ml-[32px]"
            src={Image8}
            alt="JourneyImg"
          />
          <Image
            className="w-[36px] h-[36px] absolute ml-[55px]"
            src={Image9}
            alt="JourneyImg"
          />
          <Image
            className="w-[36px] h-[36px] absolute ml-[80px]"
            src={Image10}
            alt="JourneyImg"
          />
        </div>
        <motion.p
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="text-[16px] leading-[18.75px] font-normal text-white mt-10 w-[280px] text-center relative right-[200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          Join us on our journey of simplifying social media and get early
          access to new, game-changing features.
        </motion.p>

        {response && <p>{response}</p>}

        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="flex gap-x-5 relative right-[-200px] transition-all duration-1000 ease-in-out md:flex-row flex-col"
          animate={controls}
        >
          <input
            placeholder="Enter your Email here"
            className="bg-[#3247CF] border-white border-[1px] border-t-0 border-r-0 w-[400px] text-white border-l-0 h-12 focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={subscribe}
            className="bg-[#fff] w-[151px] h-[51px] flex justify-center items-center self-center md:mt-0 mt-10  rounded-lg"
          >
            <p className="text-black underline underline-offset-auto font-medium">
              Subscribe
            </p>
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

export default Journey
