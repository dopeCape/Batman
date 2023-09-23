import React from 'react'
type MainSelectorProps = {
    title: string 
  }
export default function Rewrite({ title }: MainSelectorProps) {
    
  return (
    <div className='flex-col md:flex-row  dark:bg-[#232529] bg-[#F2F2F2] md:px-10 px-4 pt-12	justify-center items-center w-full h-full'>
        <h1 className=" font-sans text-2xl font-bold">{title}</h1>
        <h1>Please paste the content you want to Rephrase</h1>
    </div>
  )
}