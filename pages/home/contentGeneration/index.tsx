import React, { useState } from 'react'
import { useRouter } from 'next/router'


const Facebook=()=>{
        return(
            <div>facebook</div>
        )
}
const Twitter=()=>{
    return(
        <div>Twitters</div>
    )
}
const Insta=()=>{
    return(
        <div>Insta</div>
    )
}

export default function ContentCreation() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const {
        query: {
            platform,
            title
        }
    } = router

    const props = {
        platform,
        title
    }

    const Selector =()=>{
          if (props.title==='twitter'){
            return <Facebook></Facebook>
        }
          else if(props.title==='instagram'){
            return <Insta></Insta>
        }
        else if(props.title==='twitter'){
            return <Twitter></Twitter>
        }
        else{
            return <Twitter></Twitter>
        }
        
    }
    Selector()
  return (
    <div>
        <Selector></Selector>
     
        <h2>{props.title}</h2>
        <h2>{props.platform}</h2>
        </div>
  )
}
