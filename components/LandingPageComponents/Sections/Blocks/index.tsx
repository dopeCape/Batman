import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import DashBoard from "../../../../public/Images/1.png";
const Blocks = () => {
  const textScrollVariants = {
    visible: { opacity: 1, top: 0 },
    hidden: { opacity: 0 },
  };
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [response, setResponse] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  const joinTheWaitList = async (e: any) => {
    e.preventDefault();
    if (email.length === 0) return;
    try {
      setDisabled(true);
      await addDoc(collection(db, "waitList"), {
        email,
        createdAt: serverTimestamp(),
      });
      setDisabled(false);
      setEmail("");
      setResponse("Thank you! You have successfully submitted your email.");
      setTimeout(() => {
        setResponse("");
      }, 5000);
    } catch (ex) {
      setEmail("");
      setResponse("Sorry, something went wrong.");
      setTimeout(() => {
        setResponse("");
      }, 5000);
    }
  };
  return (
    <div className="bg-[#3247CF] flex pl-[7%] pb-5 w-full md:flex-row flex-col items-center">
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="flex flex-col gap-y-5 justify-center relative top-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <h1 className="font-semibold text-[64px] leading-[92%] w-[408px] text-white mt-4">
          Say BYE-BYE to creative blocks!
        </h1>
        <p className="text-white w-[447px] font-normal text-[24px] leading-[28px]">
          Generate personalized content ideas for your social media, blogs,
          websites and more.
        </p>
        {response && <p>{response}</p>}

        <form onSubmit={joinTheWaitList}>
          <input
            placeholder="Enter your Email here"
            className="bg-[#3247CF] border-white border-[1px] border-t-0 border-r-0 w-[400px] text-white border-l-0 h-12 focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <button
            disabled={disabled}
            className={`bg-[#1E1E1E] w-[151px] h-[51px] flex justify-center items-center  rounded-lg mt-5 ${
              disabled && "cursor-not-allowed"
            } `}
            type="submit"
          >
            <p className="text-white underline underline-offset-auto">
              Join the Waitlist
            </p>
          </button>
        </form>
      </motion.div>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        className="w-full mt-5 relative top-[-50px] transition-all duration-1000 ease-in-out"
        animate={controls}
      >
        <Image
          className="lg:flex hidden w-full object-cover"
          src={DashBoard}
          alt="DashBoard"
        />
      </motion.div>
    </div>
  );
};

export default Blocks;
