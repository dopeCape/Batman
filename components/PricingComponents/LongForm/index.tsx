"use client";
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { AiFillAlert } from "react-icons/ai";

function LongForm() {
  const [value, setValue] = useState<number[]>([30000]);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(value);
    }
  };

  const railStyle = {
    backgroundColor: "#e5e7eb",
    height: 5,
  };
  
  const handleStyle = {
    backgroundColor: "#374151",
    border: "none",
    borderRadius: 20,
    width: 40,
    height: 25,
    marginLeft: -0,
    marginTop: -10,
    zIndex: 100,
    outline: "none",
    "&:focus, &:hover": {
      outline: "none",
    },
  };
  
  const trackStyle = {
    backgroundColor: "#4A5568",
    height: 5,
  };

  return (
    <div className='flex flex-col w-[500px] h-[100%] py-10 pb-20 items-center rounded-[40px] border-[#6969ee] border-[3px] '>
      <div className='flex flex-col w-[100%] items-center '>
        <h1 className='text-[#101827] font-bold text-3xl'>Long-form</h1>
        <p className='font-medium py-2 text-[#4b5563] text-[23px] w-[60%] text-center '>For bloggers, freelancers & businesses</p>
        <p className='w-[65%] text-[#838995] text-[20px] text-center font-medium'>Awesome tools to help you write blog posts, books, and more.</p>
        <div className='flex flex-col h-[400px] items-center'>
          <div className='pt-20 pb-10 flex flex-col gap-y-2'>
            <h1 className='text-5xl text-[#101827] font-bold'>$19</h1>
            <p className='text-center text-[#747b88] font-normal'>/month</p>
          </div>
          <div className='flex text-[#374151] mb-5 text-[20px] gap-x-[180px] font-medium'>
            <p>{value[0]}</p>
            <p>5,000,000</p>
          </div>
    <div className='flex w-[100%] items-center justify-center'>
      <Slider
        range
        defaultValue={[0]}
        min={30000}
        max={5000000}
        step={null}
        railStyle={railStyle}
        handleStyle={[handleStyle, handleStyle]}
        trackStyle={[trackStyle, trackStyle]}
        onChange={handleSliderChange}
        marks={{
         30000: '30k',
         1000000: '1M',
         2000000: '2M',
         3000000: '3M',
         4000000: '4M',
         5000000: '5M',
        }}
      />
      </div>
          <div className='flex items-center gap-x-5 py-20'>
            <p className='text-[#101827] font-bold text-xl'>30,000 words/month</p>
            <span className='text-[#4b5563] font-medium text-xl'>1 seat</span>
          </div>
        </div>
      </div>
      <div className=' cursor-pointer text-[20px] font-bold bg-[#705cf6] text-white p-5 px-10 rounded-[10px] relative top-10 '>
        Upgrade
      </div>
    </div>
  );
}

export default LongForm;
