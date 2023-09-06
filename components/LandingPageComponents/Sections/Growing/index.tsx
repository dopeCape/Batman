import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <div
     
      className="flex flex-col right-0 w-screen justify-center items-center gap-y-20 py-10  top-[100px] bg-black"
     
    >
      <h1 className="font-semibold text-[48px] leading-[54px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#009FFD] to-[#2A2A72] pb-2">
        Never stop growing!
      </h1>
      
    </div>
  );
};

export default Growing;
