import {
  Blocks,
  Growing,
  Journey,
  Preview,
  Prompts,
  Questions,

} from "@/components/LandingPageComponents/Sections"

import React from "react"

const Home = () => {
  return (
    <>
      <Blocks />
      <Growing />
      <Preview />
      <Prompts />
      <Questions/>
      <Journey />
    </>
  )
}

export default Home
