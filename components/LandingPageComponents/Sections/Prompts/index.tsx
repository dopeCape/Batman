import Image from "next/image"
import React, { useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image1 from "../../../../public/Images/post.png"
import RImage1 from "../../../../public/Images/post.png"
import Image2 from "../../../../public/Images/4.png"
import Image3 from "../../../../public/Images/ai.png"
import Image4 from "../../../../public/Images/calender.png"
import RImage5 from "../../../../public/Images/calender.png"
import Check from '../../../../public/icons/check.png'
const Prompts = () => {
  const textScrollVariants = {
    visible: { opacity: 1, right: 0 },
    hidden: { opacity: 0 },
  }

  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [ref3, inView3] = useInView()
  const controls2 = useAnimation()
  const [ref2, inView2] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])
  useEffect(() => {
    if (inView2) {
      controls2.start("visible")
    }
  }, [controls2, inView2])
  useEffect(() => {
    if (inView3) {
      controls2.start("visible")
    }
  }, [controls2, inView3])
  return (
    <div className="pb-10 bg-white">
      <div className="bg-white md:h-[500px] flex md:pl-[7%] md:mr-[3%] md:flex-row flex-col">
        <motion.div
          ref={ref3}
          variants={textScrollVariants}
          initial="hidden"
          className="md:w-[50%] mt-[5%]  relative md:right-[-50px] transition-all  ease-in-out md:flex hidden"
          animate={controls2}
        >
          <Image
            className="absolute w-[329px]  object-contain"
            src={Image3}
            alt="Preview"
          />
         
        </motion.div>

        <motion.div
          ref={ref3}
          variants={textScrollVariants}
          initial="hidden"
          className="md:w-[50%] flex flex-col md:gap-y-5 gap-y-0 justify-center relative md:right-[-50px] transition-all duration-1000 ease-in-out px-3"
          animate={controls2}
        >
          <Image
            className=" md:w-[278px]  w-[249px] h-[249px] self-center  md:ml-[10.5%] mt-[11.8%] md:hidden flex"
            src={RImage5}
            alt="Preview"
          />
          <h1 className="text-[#1E1E1E] font-semibold md:text-[48px] text-[40px] leading-[48px] mt-20 md:mt-0">
          AI-Powered Prompts
          </h1>
          <p className="font-normal text-[16px] md:text-[20px] leading-relaxed text-justify text-[#494949] align-center my-8 md:my-0">
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Ditch the guesswork, embrace AI magic!<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Cutting-edge AI crafts perfect prompts.<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Your vision takes center stage.<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>More time for your creative genius.<br/>
          </div>

          </p>
        </motion.div>
      </div>
      <div className="bg-white md:h-[500px] flex  md:px-16 md:mr-[3%]">
      <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="md:w-[50%] flex flex-col gap-y-5 justify-center relative md:right-[-50px] transition-all duration-1000 ease-in-out px-3"
          animate={controls}
        >
          <div className="md:hidden flex justify-center  ">
            <Image
              className="  w-[249px] h-[249px] self-center  "
              src={RImage1}
              alt="Preview"
            />
          </div>
          <h1 className="text-[#1E1E1E] font-semibold md:text-[48px] text-[40px] leading-[48px] ">
          Seamless Multichannel Publishing
          </h1>
          <p className="font-normal text-[16px] md:text-[20px] leading-relaxed text-justify text-[#494949] ">
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Your content, their screens—everywhere!<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 md:self-center mr-1" src={Check} alt="tick"></Image>Simplify content creation across platforms.<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 md:self-center mr-1" src={Check} alt="tick"></Image>Instagram to YouTube—Metridash has you covered.<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 md:self-center mr-1" src={Check} alt="tick"></Image>Reach and resonate, wherever your audience thrives.
          </div>

          </p>
        </motion.div> 
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="md:w-[50%] mt-[5%] flex relative justify-center md:mr-10 md:right-[50px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          <Image
            className="absolute md:w-[329px] h-[333px] md:flex hidden object-contain"
            src={Image1}
            alt="Preview"
          />
         
        </motion.div>
      
      </div> 
      <div className="bg-white md:h-[500px] flex md:pl-[7%] md:mr-[3%] md:flex-row flex-col">
        <motion.div
          ref={ref2}
          variants={textScrollVariants}
          initial="hidden"
          className="md:w-[50%] mt-[5%]  relative md:right-[-50px] transition-all duration-1000 ease-in-out md:flex hidden"
          animate={controls2}
        >
          <Image
            className="absolute w-[329px] h-[333px] object-contain"
            src={Image4}
            alt="Preview"
          />
         
        </motion.div>

        <motion.div
          ref={ref2}
          variants={textScrollVariants}
          initial="hidden"
          className="md:w-[50%] flex flex-col gap-y-5 justify-center relative md:right-[-50px] transition-all duration-1000 ease-in-out px-3"
          animate={controls2}
        >
          <Image
            className=" md:w-[278px] w-[249px] h-[249px] self-center  mt-[11.8%] md:hidden flex"
            src={RImage5}
            alt="Preview"
          />
          <h1 className="text-[#1E1E1E] font-semibold md:text-[48px] text-[40px] leading-[48px] mt-10 md:mt-0">
          Content Calendar & Analytics
          </h1>
          <p className="font-normal text-[16px] md:text-[20px] leading-relaxed text-justify text-[#494949] align-center my-8 md:my-0">
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Master your content like a pro!<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Plan, schedule, and optimize effortlessly.<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Real-time analytics for actionable insights.<br/>
          </div>
          <div className="flex flex-row">
          <Image className="flex w-6 h-6 self-center mr-1" src={Check} alt="tick"></Image>Chart your growth journey with Metridash!
           </div>
          </p>
        </motion.div>
      </div>
    
    </div>
  )
}

export default Prompts
