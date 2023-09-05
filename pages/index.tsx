import { Blocks, Growing, Journey, Preview, Prompts } from "@/components/LandingPageComponents/Sections";

import React from "react";


const Home = () => {
  return (
    <div className="bg-black w-screen h-screen flex flex-col">
      <Blocks />
      <Growing />
      <Preview />
      <Prompts />
      <Journey />
    </div>
  );
};

export default Home;
