import Image from "next/image"
import React, { useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import PreviewImg from "../../../../public/Images/idea.png"
import RPreviewImg from "../../../../public/Images/idea.png"
const Preview = () => {
  const textScrollVariants = {
    visible: { opacity: 1, right: 0 },
    hidden: { opacity: 0 },
  }

  const controls = useAnimation()
  const [jef, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])
  return (
    <div className="bg-white flex px-3 md:px-16 items-center justify-center py-20 md:mr-[3%]">
      <motion.div
        ref={jef}
        variants={textScrollVariants}
        initial="hidden"
        className="md:w-[50%] flex flex-col gap-y-5 justify-center relative md:right-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <motion.div
          ref={jef}
          variants={textScrollVariants}
          initial="hidden"
          className="w-[100%] h-[100%] mt-[5%] relative md:right-[-50px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          <Image
            src={RPreviewImg}
            alt="Preview"
            className="sm:hidden flex object-contain"
           
          />
        </motion.div>
        <h1 className="text-[#1E1E1E]  md:text-[48px] text-[40px] font-semibold leading-[48px] md:w-[300px] ">
        Personalized Content Ideas
        </h1>
        <p className="font-md md:text-[20px] text-[16px] leading-relaxed text-justify text-[#494949]">
         -Tired of hitting that creative wall? Metridash is your secret weapon!<br/>
        -Spark your creativity with personalized ideas.<br/>
          -Tailored to your unique style.<br/>
         -Targeted for your specific audience.<br/>

        </p>
      </motion.div>
      <motion.div
        ref={jef}
        variants={textScrollVariants}
        initial="hidden"
        className="md:w-[50%] mt-[5%] relative md:right-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <Image src={PreviewImg} alt="Preview" className="sm:flex hidden object-contain" />
      </motion.div>
    </div>
  )
}

export default Preview
