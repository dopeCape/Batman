import { Blocks, Growing, Journey, Prompts } from "@/components/LandingPageComponents/Sections";

import React from "react";
// import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <div className="bg-black">
      <Blocks />
      <Growing />
      <Prompts />
      <Journey />
    </div>
  );
};

export default Home;
