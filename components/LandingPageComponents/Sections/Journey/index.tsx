import Image from "next/image"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useAnimation, motion } from "framer-motion"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase"
import { useInView } from "react-intersection-observer"
import Image7 from "../../../../public/Images/7.png"
import Image8 from "../../../../public/Images/8.png"
import Image9 from "../../../../public/Images/9.png"
import Image10 from "../../../../public/Images/10.png"
import Rocket from "../../../../public/homepageIcons/rocket.png"
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
      <div className="bg-[#3247CF] h-[587px] flex flex-col gap-y-6 justify-center items-center">
        <motion.h1
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="font-semibold text-[48px] leading-[48px] text-center md:w-[425px] relative md:right-[-50px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
        Ready to Get Started?
        </motion.h1>
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className=" relative transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          <Image
            src={Rocket}
            alt="Preview"
            className="flex w-24 h-24 object-contain"
           
          />
        </motion.div>
        <motion.p
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="text-xl leading-6 font-light text-white mt-6 w-[280px] text-center relative md:right-[200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
         Join thousands of creators who have already unlocked their potential with Metridash.
        </motion.p>
        {response && <p className="text-center">{response}</p>}
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="flex gap-x-5 relative md:right-[-50px] transition-all duration-1000 ease-in-out md:flex-row flex-col"
          animate={controls}
        >
          
            <Link href={'/auth/signup'}
              
              className={`w-full bg-[#1E1E1E] px-4 py-2 flex justify-center items-center  rounded-lg mt-5 `}
              type="submit"
            >
              <p className="text-white text-xl underline underline-offset-auto">
                Try for free
              </p>
            </Link>
    
        </motion.div>
      </div>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 mt-5">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {year}{" "}
            <Link href="/" className="hover:underline">
              Metridash
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link href="/privacy" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="mr-4 hover:underline md:mr-6">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Journey
