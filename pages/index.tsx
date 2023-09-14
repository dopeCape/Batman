import {
  Blocks,
  Growing,
  Journey,
  Preview,
  Prompts,
  Questions,
  Testimonials
} from "@/components/LandingPageComponents/Sections"

import React from "react"

const Home = () => {
  return (
    <>
      <Blocks />
      <Growing />
      <Preview />
      <Prompts />
      <Testimonials/>
      <Questions/>
      <Journey />
    </>
  )
}

export default Home
