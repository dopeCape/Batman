import React from "react";
import Blocks from "../Blocks";
import Preview from "../Preview";
import Growing from "../Growing";
import Prompts from "../Prompts";
import Journey from "../Journey";
import Testimonials from "../Testimonials";
const Content = () => {
  return (
    <div>
      <Blocks />
      <Preview />
      <Growing />
      <Testimonials/>
      <Prompts />
      <Journey />
    </div>
  );
};

export default Content;
