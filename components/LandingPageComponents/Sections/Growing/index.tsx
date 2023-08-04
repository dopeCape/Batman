import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import classes from "./index.module.css";

const Growing = () => {
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
    <motion.div
      ref={ref}
      variants={textScrollVariants}
      initial="hidden"
      className="flex flex-col justify-center gap-y-20 py-10 relative top-[100px] transition-all duration-1000 ease-in-out"
      animate={controls}
    >
      {/* <h1 className="font-semibold text-[48px] leading-[54px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#009FFD] to-[#2A2A72] ">
        Never stop growing!
      </h1>
      <div className="flex gap-x-5 md:flex-row flex-col justify-center align-center">
        <input
          placeholder="Enter your Email here"
          className="bg-[#fff] border-[#2E353A] border-[1px] border-t-0 border-r-0 w-[400px] text-black border-l-0 h-12 focus:outline-none ::placeholder font-medium placeholder-[#2E353A] pl-4 rounded-md"
        />
        <button className="bg-[#3247CF] w-[151px] h-[51px] flex justify-center items-center  rounded-lg self-center md:mt-0 mt-4">
          <p className="text-white underline underline-offset-auto"> */}
      
      
      <h1 className="text-[#1E1E1E] font-semibold text-[2rem] leading-[48px] text-center ">
        Never stop growing!
      </h1>
      <div className={classes.email__field}>
        <input
          placeholder="Enter your Email here"
          className="bg-[#fff] border-[#2E353A] border-[1px] indent-[20px] border-t-0 border-r-0 w-[80%] text-black border-l-0 h-12 focus:outline-none ::placeholder font-medium placeholder-[#2E353A]"
        />
        <button className="bg-[#3247CF] w-[151px] h-[51px] text-white flex justify-center items-center  rounded-lg">
            Join the Waitlist
        </button>
      </div>
    </motion.div>
  );
};

export default Growing;
