import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image7 from "../../../../public/Images/7.png";
import Image8 from "../../../../public/Images/8.png";
import Image9 from "../../../../public/Images/9.png";
import Image10 from "../../../../public/Images/10.png";
import classes from "./index.module.css";

const Journey = () => {
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
      <div className={`${classes.footer__sect} h-[587px] relative`}>
        <motion.h1
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="font-semibold text-[2rem] leading-[48px] w-[50%] text-center relative transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          CREATED FOR YOU, WITH YOU!
        </motion.h1>
        <div className={`${classes.icon_footer}`}>
          <Image
              className={`${classes.footer__icon} w-[36px] h-[36px]`}
              src={Image7}
              alt="JourneyImg"
            />
            <Image
              className={`${classes.footer__icon1} w-[36px] h-[36px]`}
              src={Image8}
              alt="JourneyImg"
            />
            <Image
              className={`${classes.footer__icon2} w-[36px] h-[36px]`}
              src={Image9}
              alt="JourneyImg"
            />
            <Image
              className={`${classes.footer__icon3} w-[36px] h-[36px]`}
              src={Image10}
              alt="JourneyImg"
            />
        </div>
        <motion.p
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className={`${classes.footer_text} text-[1rem] leading-[18.75px] font-normal text-white w-[70%] mt-10 text-center relative right-[200px] transition-all duration-1000 ease-in-out`}
          animate={controls}
        >
          Join us on our journey of simplifying social media and get early
          access to new, game-changing features.
        </motion.p>
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className={`${classes.footer_waitlist} transition-all duration-1000 ease-in-out`}
          animate={controls}
        >
          <input
            placeholder="Enter your Email here"
            className="bg-[#3247CF] border-white border-[1px] border-t-0 border-r-0 indent-[10px] text-white border-l-0 h-12 focus:outline-none"
          />
          <button className="bg-[#fff] text-black h-[51px] flex justify-center items-center rounded-lg">
              Join the Waitlist
          </button>
        </motion.div>
      </div>
      <div className={`${classes.copyright_sect} h-10 bg-blue-800 flex justify-center items-center`}>
        <p className="text-[#FFFFFF7B] text-[16px] font-normal ">
          Copyright 2023 Metridash
        </p>
      </div>
    </>
  );
};

export default Journey;
