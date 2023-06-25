import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image1 from "../../../../public/Images/3.png";
import Image2 from "../../../../public/Images/4.png";
import Image3 from "../../../../public/Images/5.png";
import Image4 from "../../../../public/Images/6.png";
import PreviewImg from "../../../../public/Images/2.png";
import classes from "./index.module.css";

const Prompts = () => {
  const textScrollVariants = {
    visible: { opacity: 1, right: 0 },
    hidden: { opacity: 0 },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();
  const controls2 = useAnimation();
  const [ref2, inView2] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  useEffect(() => {
    if (inView2) {
      controls2.start("visible");
    }
  }, [controls2, inView2]);
  return (
    <div> 
      <div className={`${classes.prompt_division}  ${classes.division__prompt} ${classes.first__prompt}`}>
        <div className={classes.img_div}>
          <motion.div
            ref={ref2}
            variants={textScrollVariants}
            initial="hidden"
            className={`${classes.prompt__img} transition-all duration-1000 ease-in-out`}
            animate={controls2}
            // w-[50%] mt-[5%] flex relative right-[-200px]
          >
            <Image
              className={`${classes.metric__bg}`}
              src={PreviewImg}
              alt="Preview"
            />
          </motion.div>
        </div>
        <motion.div
          ref={ref2}
          variants={textScrollVariants}
          initial="hidden"
          className={`${classes.preview_sect} flex flex-col items-center gap-y-5 justify-center relative transition-all duration-1000 ease-in-out`}
          animate={controls2}
        >
          <div>
            <h1 className="text-[#1E1E1E] font-semibold text-[2rem]">
                We help you stay on top of your game!
            </h1>
            <p className="font-normal text-[1rem] leading-[18.75px] text-center text-[#494949]">
                We have added our own proprietary algorithm to chat gpt and taken out
                the headache of finding a good prompt.
            </p>
          </div>
        </motion.div>
      </div>
      <div className={classes.prompt_division}>
        <div className={classes.img_div}>
          <motion.div
            ref={ref2}
            variants={textScrollVariants}
            initial="hidden"
            className={`${classes.prompt__img} transition-all duration-1000 ease-in-out`}
            animate={controls2}
            // w-[50%] mt-[5%] flex relative right-[-200px]
          >
            <Image
              className={`${classes.metric__bg}`}
              src={Image3}
              alt="Preview"
            />
            <Image
              className={`${classes.metric__image}`}
              src={Image4}
              alt="Preview"
            />
          </motion.div>
        </div>
        <motion.div
          ref={ref2}
          variants={textScrollVariants}
          initial="hidden"
          className={`${classes.preview_sect} flex flex-col items-center gap-y-5 justify-center relative transition-all duration-1000 ease-in-out`}
          animate={controls2}
        >
          <h1 className="text-[#1E1E1E] font-semibold text-[2rem]">
            Focus on the big picture!
          </h1>
          <p className="font-normal text-[1rem] leading-[18.75px] text-center text-[#494949]">
            Metridash helps you reduce the time taken to genrate content ideas
            in turn giving you more time to work on the strategies and your
            growth.
          </p>
        </motion.div>
      </div>
      <div className={`${classes.prompt_division} ${classes.division__prompt}`}>
        <div className={`${classes.img_div}`}>
          <motion.div
            ref={ref}
            variants={textScrollVariants}
            initial="hidden"
            className={`${classes.prompt__img} transition-all duration-1000 ease-in-out`}
            // w-[50%] mt-[5%] flex relative justify-center mr-10 right-[200px] transition-all duration-1000 ease-in-out
            animate={controls}
          >
            <Image
              // "absolute w-[329px] h-[333px]"
              className={`${classes.metric__bg}`}
              src={Image1}
              alt="Preview"
            />
            <Image
              className={`${classes.metric__image}`}
              // absolute w-[238px] h-[209px] ml-[54%] mt-[25%]
              src={Image2}
              alt="Preview"
            />
          </motion.div>
        </div>
          <motion.div
            ref={ref}
            variants={textScrollVariants}
            initial="hidden"
            className={`${classes.preview_sect} flex flex-col items-center gap-y-5 justify-center relative right-[200px] transition-all duration-1000 ease-in-out`}
            animate={controls}
          >
            <h1 className="text-[#1E1E1E] font-semibold text-[2rem] leading-[48px]">
              No more bad prompts.
            </h1>
            <p className="font-normal text-[1rem] leading-[18.75px] text-center text-[#494949]">
              You only need to select and type in some details about yourself, the
              target audience, etc and we create the best prompt for you, for the
              best results.
            </p>
          </motion.div>
        </div>
    </div>
  );
};

export default Prompts;
