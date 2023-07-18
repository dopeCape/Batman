import Image from "next/image";
import idea from "../../public/icons/idea.png";
import caption from "../../public/icons/caption.png";
import hashtag from "../../public/icons/hashtag.png";
import thumbnail from "../../public/icons/thumbnail.png";
import magic from "../../public/icons/magic.png";
import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import classes from "./features.module.css";

const Features = () => {
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
    <div className={`${classes.content_container} bg-gray-50 h-screen`}>
      <motion.div
        ref={ref}
        variants={textScrollVariants}
        initial="hidden"
        animate={controls}
        className={`${classes.create_content} flex flex-col items-center justify-center bg-white transition-all duration-5000 ease-in-out`}
      >
        <Image
          src={magic}
          alt="Picture of the author"
          className="w-32 object-contain h-34 mb-10"
        />
        <h1
          className={`${classes.content__intro} text-blue-600 text-4xl font-medium text-left px-14`}
        >
          Create content by using the power of AI
        </h1>
        <p
          className={`${classes.content_text} text-gray-500 py-5 px-14 text-left text-lg`}
        >
          Generate personalized content ideas for your social media, blogs,
          websites and more with the power of AI.
        </p>
      </motion.div>
      <div
        className={`${classes.second__content} bg-gradient-to-r from-[#009FFD] to-[#2A2A72] py-14`}
      >
        <h1 className=" text-3xl font-medium text-white mb-4">Features</h1>
        <div className={`${classes.content_boxes}`}>
          <div>
            <motion.div
              ref={ref}
              variants={textScrollVariants}
              initial="hidden"
              animate={controls}
              className=" drop-shadow-lg w-80 h-96 bg-white my-5 mx-1 flex flex-col items-center justify-center px-6  top-[100px] transition-all duration-1000 ease-in-out"
            >
              <Image
                src={idea}
                alt="Picture of the author"
                className="w-32 object-contain h-34 mb-5"
              />
              <h2 className="text-gray-500 text-center text-md">
                Generate engaging post ideas that spark conversations and drive
                interactions.
              </h2>
            </motion.div>

            <motion.div
              ref={ref}
              variants={textScrollVariants}
              initial="hidden"
              animate={controls}
              className="w-80 h-40 bg-white drop-shadow-lg my-1 mx-1 flex flex-col items-center justify-center px-2"
            >
              <Image
                src={caption}
                alt="Picture of the author"
                className="w-12 object-contain h-14 mb-2"
              />
              <h2 className="text-gray-500 text-center text-sm">
                Write scroll-stopping captions that encourage people to stop,
                look, and like.
              </h2>
            </motion.div>
          </div>
          <div>
            <motion.div
              ref={ref}
              variants={textScrollVariants}
              initial="hidden"
              animate={controls}
              className="drop-shadow-lg w-80 h-40 bg-white my-5 mx-1 flex flex-col items-center justify-center px-2"
            >
              <Image
                src={hashtag}
                alt="Picture of the author"
                className="w-12 object-contain h-14 mb-2"
              />
              <h2 className="text-gray-500 text-center text-sm">
                Discover relevant tags to optimize your videos for better search
                rankings.
              </h2>
            </motion.div>
            <motion.div
              ref={ref}
              variants={textScrollVariants}
              initial="hidden"
              animate={controls}
              className="drop-shadow-lg w-80 h-96 bg-white my-1 mx-1 flex flex-col items-center justify-center px-6"
            >
              <Image
                src={thumbnail}
                alt="Picture of the author"
                className="w-18 object-contain h-20 mb-5"
              />
              <h2 className="text-gray-500 text-center text-md">
                Grab viewer&apos;s attention and increase click-through rates
                with eye-catching thumbnail ideas that make your YouTube videos
                stand out.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
