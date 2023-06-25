import { Blocks, Growing, Journey, Preview, Prompts } from "@/components/LandingPageComponents/Sections";
import React from "react";
// import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <>
      <Blocks />
      <Growing />
      {/* <Preview /> */}
      <Prompts />
      <Journey />
    </>
  );
};

export default Home;
