import Image from "next/image"
import React, { useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import PreviewImg from "../../../../public/Images/2.png"
import RPreviewImg from "../../../../public/Images/2(1).png"
const Preview = () => {
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
  return (
    <div className="bg-white flex px-3 md:px-16 items-center justify-center py-20 md:mr-[3%]">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="md:w-[50%] flex flex-col gap-y-5 justify-center relative md:right-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="w-[100%] h-[100%] mt-[5%] relative md:right-[-50px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          <Image
            src={RPreviewImg}
            alt="Preview"
            className="sm:hidden flex object-contain"
            width={800}
            height={450}
          />
        </motion.div>
        <h1 className="text-[#1E1E1E]  text-[48px] font-semibold leading-[48px] md:w-[300px] ">
          We help you stay on top of your game!
        </h1>
        <p className="font-normal text-[16px] leading-[18.75px] text-justify text-[#494949]">
          We have added our own proprietary algorithm to ChatGPT and taken out
          the headache of finding a good prompt.
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="md:w-[50%] mt-[5%] relative md:right-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <Image src={PreviewImg} alt="Preview" className="sm:flex hidden" />
      </motion.div>
    </div>
  )
}

export default Preview
