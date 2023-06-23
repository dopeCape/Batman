import { Blocks, Growing, Journey, Preview, Prompts } from "@/components/LandingPageComponents/Sections";
import React from "react";
// import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <div className="w-screen flex flex-col ">
      <Blocks />
      <Growing />
      <Preview />
      <Prompts />
      <Journey />

    </div>
  );
};

export default Home;
