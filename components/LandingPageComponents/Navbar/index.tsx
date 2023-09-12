import React, { useState } from "react";

interface Props {
  children: JSX.Element;
}

const Navbar = (props:Props) => {
  const [active, setActive] = useState<string>("0");

  const handleClick = (index: number) => {
    setActive(index.toString());
  };
  return (
    <>
      <div className="bg-[#3247CF] flex justify-between px-[7%] items-center h-10 py-10">
        <h1 className="font-semibold text-[20px] leading-[23px] text-black">
          Metridash
        </h1>
        <ul className="flex justify-center gap-x-10">
          <li
            className={`cursor-pointer mr-4 ${
              active === "0" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(0)}
          >
            Home
          </li>
          <li
            className={`cursor-pointer mr-4 ${
              active === "1" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(1)}
          >
            Features
          </li>
          <li
            className={`cursor-pointer mr-4 ${
              active === "2" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(2)}
          >
            Pricing
          </li>
          <li
            className={`cursor-pointer mr-4 ${
              active === "3" ? "text-[#fff]" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(3)}
          >
            Contact Us
          </li>
        </ul>
      </div>
      <main>{props.children}</main>
    </>
  );
};

export default Navbar;
