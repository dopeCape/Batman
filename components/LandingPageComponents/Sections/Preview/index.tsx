import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PreviewImg from "../../../../public/Images/2.png";
import classes from "./index.module.css";

const Preview = () => {
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
    <div className={`${classes.preview_division} pl-[7%]`}>
      <div className={classes.image__sect}>
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className={` flex flex-col gap-y-5 justify-center relative right-[-50px] transition-all duration-1000 ease-in-out`}
          animate={controls}
        >
          <h1 className={`${classes.preview__head} text-[#1E1E1E] font-semibold text-[2rem]`}>
            We help you stay on top of your game!
          </h1>
          <p className="font-normal text-[1rem] leading-[28px] text-[#797979]">
            We have added our own proprietary algorithm to chat gpt and taken out
            the headache of finding a good prompt.
          </p>
        </motion.div>
      </div>
      <div className={classes.image__sect}>
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className={`${classes.prompt__img} transition-all duration-1000 ease-in-out`}
          animate={controls}
        >
          <Image src={PreviewImg} alt="Preview" />
        </motion.div>
      </div>
    </div>
    //    <div className={classes.prompt_division}>
    //    <div className={classes.img_div}>
    //      <motion.div
    //        ref={ref}
    //        variants={textScrollVariants}
    //        initial="hidden"
    //        className={`${classes.prompt__img} transition-all duration-1000 ease-in-out`}
    //        animate={controls}
    //        // w-[50%] mt-[5%] flex relative right-[-200px]
    //      >
    //        <Image
    //          className={`${classes.metric__bg}`}
    //          src={PreviewImg}
    //          alt="Preview"
    //        />
    //        <Image
    //          className={`${classes.metric__image}`}
    //          src={Image4}
    //          alt="Preview"
    //        />
    //      </motion.div>
    //    </div>
    //    <motion.div
    //      ref={ref2}
    //      variants={textScrollVariants}
    //      initial="hidden"
    //      className="w-[50%] flex flex-col items-center gap-y-5 justify-center relative right-[200px] transition-all duration-1000 ease-in-out"
    //      animate={controls2}
    //    >
    //      <h1 className="text-[#1E1E1E] font-semibold text-[48px] leading-[48px] w-[400px]">
    //        Focus on the big picture!
    //      </h1>
    //      <p className="font-normal text-[16px] leading-[18.75px] text-justify text-[#494949] w-[387px]">
    //        Metridash helps you reduce the time taken to genrate content ideas
    //        in turn giving you more time to work on the strategies and your
    //        growth.
    //      </p>
    //    </motion.div>
    //  </div>
  );
};

export default Preview;
