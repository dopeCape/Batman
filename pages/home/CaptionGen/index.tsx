
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router'
import AddCircle from '@mui/icons-material/AddCircleOutlineTwoTone';
import Cancel from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Conversational', 'Enthusastic', 'Funny', 'Professional', 'Describe a tone'];

export default function CaptionGen() {
  const [value, setValue] = useState<string | null>(options[0]);
  const [keywords, setKeywords] = useState([])
  const [word, setWord] = useState('')
  const [inputValue, setInputValue] = useState('');
  const router = useRouter()

  const handleKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    // keywords.push(event.target.value);
    setWord(event.target.value)
  };

  // const AddKeyword=()=>{
  //     keywords.push(word);
  // }

  const KeywordsComp=()=>{
    return(
      <div className='flex flex-row'>
        {keywords.map((word)=>{
          return(
            <div className='mx-1 px-2 border border-gray-300 bg-white flex-row flex'>
              <Cancel className='bg-black w-0.5 h-0.5'></Cancel>
              <p className='text-gray-800'>
                {word}
              </p>
              </div>
                
          )
        })}
      </div>
    )
  }

  const TextInput=()=>{
    return(
      <input 
      className='w-full px-2 py-2 rounded-lg border border-gray-300 text-black mt-2'
       placeholder='Describe a tone' type='text'></input>
    )
  }
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
  return (
    <div className='flex justify-center items-center'>
      <div className='w-2/5 h-screen flex bg-gray-200 px-10 py-16 flex-col '>
        <h1 className='text-black font-sans text-2xl font-medium'>Generate {props.title}</h1>
        <h3 className='text-sm text-gray-500'>Optimise your captions for greater visibility and higher engagement.</h3>
        <form onSubmit={(e)=>e.preventDefault()} className='my-4'>
          <h3 className='text-black text-base mb-2'>Whats your post about?*</h3>
          <input className='w-full px-2 py-2 rounded-lg border border-gray-300 text-black' type="text" placeholder='gaming, fashion, animals etc.'></input>

          <h3 className='text-black text-base mb-2 mt-3'>Keywords*</h3>
          <div className='flex flex-row  '>
            <input onChange={handleKeyword} className='w-4/5 px-2 py-2 border border-gray-300 rounded-lg text-black ' type="text" placeholder='gaming, fashion, animals'></input>
            <button  className='cursor-pointer bg-white w-1/5  flex justify-center items-center border border-gray-300 rounded-lg  '>
              <AddCircle className='bg-gray-500 rounded-xl '></AddCircle>
            </button>

          </div>
          {keywords?<KeywordsComp></KeywordsComp>:<></>}
          <h3 className='text-black text-base mb-2 mt-3'>Tone*</h3>
          {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
          <div>{`inputValue: '${inputValue}'`}</div>
          <br /> */}
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: '60%', backgroundColor: 'white', }}
            renderInput={(params) => <TextField {...params} label="Select Tone" />}
          />
          {inputValue=='Describe a tone'?<TextInput></TextInput>:<></>}
          <h3 className='text-black text-base mb-2 mt-3'>Target audience*</h3>
          <input className='w-full px-2 py-2 rounded-lg border border-gray-300 text-black' type="text" placeholder='travellers, gamers etc.'></input>

          <button className='w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-r from-[#009FFD] to-[#2A2A72]'>Generate(1 credit)</button>
          </form>
      </div>
      <div className='w-3/5 h-screen flex bg-white'>
      </div>


    </div>
  )
}
