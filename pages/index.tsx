import { Blocks, Growing, Journey, Preview, Prompts } from "@/components/LandingPageComponents/Sections";
import { ClassNames } from "@emotion/react";

import React from "react";
// import LandingPage from "./LandingPage";

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
