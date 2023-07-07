import Image from "next/image";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image1 from "../../../../public/Images/3.png";
import RImage1 from "../../../../public/Images/3(1).png";
import Image2 from "../../../../public/Images/4.png";
import Image3 from "../../../../public/Images/5.png";
import Image4 from "../../../../public/Images/6.png";
import RImage5 from "../../../../public/Images/5(1).png";

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
    <div className="pb-10">
      <div className="bg-white h-[500px] flex md:px-10 px-16 mr-[3%]">
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="w-[50%] flex flex-col gap-y-5 justify-center relative right-[-200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          <div className="md:hidden flex justify-center  ">
          <Image
            className=" w-[678px] h-[180px] "
            src={RImage1}
            alt="Preview"
          />
          

          </div>
          <h1 className="text-[#1E1E1E] font-semibold text-[48px] leading-[48px] w-[300px]">
            No more bad prompts.
          </h1>
          <p className="font-normal text-[16px] leading-[18.75px] text-justify text-[#494949] w-[387px]">
            You only need to select and type in some details about yourself, the
            target audience, etc and we create the best prompt for you, for the
            best results.
          </p>
        </motion.div>
        <motion.div
          ref={ref}
          variants={textScrollVariants}
          initial="hidden"
          className="w-[50%] mt-[5%] flex relative justify-center mr-10 right-[200px] transition-all duration-1000 ease-in-out"
          animate={controls}
        >
          <Image
            className="absolute w-[329px] h-[333px] md:flex hidden object-contain"
            src={Image1}
            alt="Preview"
          />
          <Image
            className="absolute w-[238px] h-[209px] ml-[54%] mt-[25%] md:flex hidden object-contain"
            src={Image2}
            alt="Preview"
          />
        </motion.div>
      </div>
      <div className="bg-white h-[500px] flex pl-[7%] mr-[3%] md:flex-row flex-col">
        <motion.div
          ref={ref2}
          variants={textScrollVariants}
          initial="hidden"
          className="w-[50%] mt-[5%] flex relative right-[-200px] transition-all duration-1000 ease-in-out md:flex hidden"
          animate={controls2}
        >
          <Image
            className="absolute w-[329px] h-[333px] object-contain"
            src={Image3}
            alt="Preview"
          />
          <Image
            className="absolute w-[238px] h-[209px] ml-[10.5%] mt-[11.8%] object-contain"
            src={Image4}
            alt="Preview"
          />
        </motion.div>
       
        <motion.div
          ref={ref2}
          variants={textScrollVariants}
          initial="hidden"
          className="w-[50%] flex flex-col gap-y-5 justify-center relative right-[-200px] transition-all duration-1000 ease-in-out"
          animate={controls2}
        >
          <Image
            className=" w-[278px] h-[209px] ml-[10.5%] mt-[11.8%] md:hidden flex"
            src={RImage5}
            alt="Preview"
          />
          <h1 className="text-[#1E1E1E] font-semibold text-[48px] leading-[48px] w-[300px]">
            Focus on the big picture!
          </h1>
          <p className="font-normal text-[16px] leading-[18.75px] text-justify text-[#494949] w-[387px] align-center">
            Metridash helps you reduce the time taken to genrate content ideas
            in turn giving you more time to work on the strategies and your
            growth.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Prompts;
