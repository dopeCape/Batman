import { Blocks, Growing, Journey, Preview, Prompts } from "@/components/LandingPageComponents/Sections";

import React from "react";


const Home = () => {
  return (
    <div className="bg-black">
      <Blocks />
      <Growing />
      <Preview />
      <Prompts />
      <Journey />
    </div>
  );
};

export default Home;
