import React from 'react'
import Form1 from './form1'
import Form2 from './form2'
import Form3 from './form3'
import Form4 from './form4'
import Repurpose from './repurpose'
import Rewrite from './rewrite'

type MainSelectorProps = {
    platform: string; // Adjust the type according to your use case
  };
  
export default function MinSelector({ platform }: MainSelectorProps) {
    if (platform === 'YouTube Tag'|| platform === 'Twitter(X) Hashtag' || platform === 'TikTok Hashtag' || platform === 'Instagram Hashtag') {
        return <Form1 title={platform} />
    }
    if (platform === 'LinkedIn Post'|| platform === 'LinkedIn Articles') {
        return <Form2 title={platform}/>
    }
    if (platform === 'YouTube Thumbnail') {
        return <Form3 title={platform}/>
    }
    if (platform === 'Repurpose') {
        return <Repurpose title={platform}/>
    }
    if (platform === 'Rewrite') {
        return <Rewrite title={platform}/>
    }
    
    else{
        return <Form4 title={platform}/>
    }
  
}
