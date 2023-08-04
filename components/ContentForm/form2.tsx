import React from 'react'
type MainSelectorProps = {
    title: string; // Adjust the type according to your use case
  };
export default function Form2({title}:MainSelectorProps) {
  return (
    <div className='flex w-full h-full items-center justify-center'>form1{title}</div>
  )
}
