import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PreviewImg from "../../../../public/Images/2.png";
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
    <div className="bg-white flex pl-[7%] mr-[3%]">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="w-[50%] flex flex-col gap-y-5 justify-center relative right-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <h1 className="text-[#3247CF] font-semibold text-[48px] leading-[48.09px] w-[447px]">
          We help you stay on top of your game!
        </h1>
        <p className="font-normal text-[24px] leading-[28px] text-[#797979] w-[488px]">
          We have added our own proprietary algorithm to chat gpt and taken out
          the headache of finding a good prompt.
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="w-[50%] mt-[5%] relative right-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <Image src={PreviewImg} alt="Preview" />
      </motion.div>
    </div>
  );
};

export default Preview;
