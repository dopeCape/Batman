import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DashBoard from "../../../../public/Images/1.png";
import classes from "./index.module.css";

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
    <div className={`${classes.content} bg-[#3247CF] pl-[7%] pb-5`}>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className={`${classes.first_content} ${classes.desktop_content} w-[50%] flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out`}
        animate={controls}
      >
        {/* w-[50%] flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out */}
        <h1 className="font-semibold text-[64px] leading-[92%] text-white">
          Say BYE-BYE to creative blocks!
        </h1>
        <p className="text-white w-[447px] font-normal text-[24px] leading-[28px]">
          Generate personalized content ideas for your social media, blogs,
          websites and more.
        </p>
        <div className={classes.waitlist__reg}>
          <input
            placeholder="Enter your Email here"
            className="bg-[#3247CF] border-white border-[1px] border-t-0 border-r-0 w-[400px] text-white border-l-0 h-12 focus:outline-none"
          />
          <button className="bg-[#1E1E1E] w-[151px] h-[51px] text-white flex justify-center items-center  rounded-lg">
              Join the Waitlist
          </button>
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className={`${classes.second_content} transition-all duration-1000 ease-in-out`}
        animate={controls}
      >
        <Image src={DashBoard} alt="DashBoard" className={classes.dashboard_img} />
      </motion.div>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className={`${classes.first_content} ${classes.mobile_content} flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out`}
        animate={controls}
      >
        {/* w-[50%] flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out */}
        <h1 className="font-semibold leading-[92%] text-white">
          Say BYE-BYE to creative blocks!
        </h1>
        <p className="text-white font-normal">
          Generate personalized content ideas for your social media, blogs,
          websites and more.
        </p>
        <div className={classes.waitlist__reg}>
          <input
            placeholder="Enter your Email here"
            className="bg-[#3247CF] border-white border-[1px] border-t-0 border-r-0 text-white border-l-0 h-12 focus:outline-none"
          />
          <button className="bg-[#1E1E1E] text-white w-[151px] h-[51px] flex justify-center items-center  rounded-lg">
              Join the Waitlist
          </button>
        </div>
      </motion.div>
      
    </div>
  );
};

export default Blocks;
