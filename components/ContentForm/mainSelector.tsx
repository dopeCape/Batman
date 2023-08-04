import React from 'react'
import Form1 from './form1'
import Form2 from './form2'
import Form3 from './form3'
import Form4 from './form4'

type MainSelectorProps = {
    platform: string; // Adjust the type according to your use case
  };
  
export default function MinSelector({ platform }: MainSelectorProps) {
    if (platform === 'Youtube Tags'|| platform === 'Twitter Hashtags' || platform === 'TikTok Hashtags' || platform === 'Instagram Hashtags') {
        return <Form1 />
    }
    if (platform === 'LinkedIn Post'|| platform === 'LinkedIn Articles') {
        return <Form2 />
    }
    if (platform === 'Youtube Thumbnail') {
        return <Form3 />
    }
    else{
        return <Form4 />
    }
  
}
