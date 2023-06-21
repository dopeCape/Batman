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
    <div className="bg-white flex px-10  items-center justify-center py-20 mr-[3%]">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="w-[50%] flex flex-col gap-y-5 justify-center relative right-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <Image src={PreviewImg} alt="Preview" className="sm:hidden flex" />
        <h1 className="text-[#3247CF]  md:text-[48px] text-[48px] font-semibold leading-[48px] w-[300px]">
          We help you stay on top of your game!
        </h1>
        <p className="font-normal text-[16px] leading-[18.75px] text-justify text-[#494949] w-[387px]">
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
        <Image src={PreviewImg} alt="Preview" className="sm:flex hidden"/>
      </motion.div>
    </div>
  );
};

export default Preview;
