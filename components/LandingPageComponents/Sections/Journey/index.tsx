import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image7 from "../../../../public/Images/7.png";
import Image8 from "../../../../public/Images/8.png";
import Image9 from "../../../../public/Images/9.png";
import Image10 from "../../../../public/Images/10.png";
const Journey = () => {
  const year = new Date().getFullYear();

  const textScrollVariants = {
    visible: { opacity: 1, right: 0 },
    hidden: { opacity: 0 },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <>
      <div className="bg-[#3247CF] h-[587px] flex flex-col gap-y-10 justify-center items-center">
        <motion.h1
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="font-semibold text-[48px] leading-[48px] text-center w-[425px] relative right-[-200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          CREATED FOR YOU, WITH YOU!
        </motion.h1>
        <div className="flex mr-[5%]">
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
          className="text-[16px] leading-[18.75px] font-normal text-white mt-10 w-[280px] text-center relative right-[200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          Join us on our journey of simplifying social media and get early
          access to new, game-changing features.
        </motion.p>
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
          />
          <button className="bg-[#fff] w-[151px] h-[51px] flex justify-center items-center self-center md:mt-0 mt-10  rounded-lg">
            <p className="text-black underline underline-offset-auto font-medium">
              Join the Waitlist
            </p>
          </button>
        </motion.div>
      </div>
      <div className="h-10 bg-blue-800 flex justify-center items-center">
        <p className="text-[#FFFFFF7B] text-[16px] font-normal ">
          Copyright {year} Metridash
        </p>
      </div>
    </>
  );
};

export default Journey;
