import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DashBoard from "../../../../public/Images/1.png";
const Blocks = () => {
  const textScrollVariants = {
    visible: { opacity: 1, top: 0 },
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
    <div className="bg-[#3247CF] flex pl-[7%] pb-5">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="w-[50%] flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <h1 className="font-semibold text-[64px] leading-[92%] w-[408px] text-white">
          Say BYE-BYE to creative blocks!
        </h1>
        <p className="text-white w-[447px] font-normal text-[24px] leading-[28px]">
          Generate personalized conten ideas for your social media, blogs,
          websites and more.
        </p>
        <input
          placeholder="Enter your Email here"
          className="bg-[#3247CF] border-white border-[1px] border-t-0 border-r-0 w-[400px] text-white border-l-0 h-12 focus:outline-none"
        />
        <button className="bg-[#1E1E1E] w-[151px] h-[51px] flex justify-center items-center  rounded-lg">
          <p className="text-white underline underline-offset-auto">
            Join the Waitlist
          </p>
        </button>
      </motion.div>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="w-[50%] mt-5 relative top-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <Image src={DashBoard} alt="DashBoard" />
      </motion.div>
    </div>
  );
};

export default Blocks;
