import React,{useState, ChangeEvent, useEffect} from 'react'
import TextField from "@mui/material/TextField"
import { DropDownOptions } from '@/data/general'
import Autocomplete from "@mui/material/Autocomplete"
import { updateTokens, readTokens, getUserToken } from "../../auth"
import { platformAtom, responseAtom } from "@/utils/store"
import { auth } from "@/firebase"
import { Modal, Box, OutlinedInput } from "@mui/material"
import { StyleModal } from "@/components/modalStyle"
import PopUpCard from "@/components/PopUpCard"
import { useTheme } from "next-themes"
import { setPrompt, TokensNeeded, InputTitle, Descriptions } from "@/hooks/function"
import { useBeforeunload } from "react-beforeunload"

import { useAtom } from "jotai"
type MainSelectorProps = {
    title: string // Adjust the type according to your use case
  }
  const options = [
    "Shorten",
    "Exemplify",
    "Expand",
    "Simplify",
    
 
  ]
  const options1 = [
    "Conversational",
    "Enthusiastic",
    "Funny",
    "Professional",
    
 
  ]

  export const disabled = (...args: any[]) => {
    return args.some(
      (arg) =>
        (typeof arg === "string" && arg?.trim().length === 0) ||
        (typeof arg === "object" && arg?.length === 0)
    )
  }

export default function Repurpose({ title }: MainSelectorProps) {
    const [postAboutCount, setPostAboutCount] = useState(0)
    const [value, setValue] = useState<any>("")
    const [value1, setValue1] = useState<any>("")
    const [input, setInput] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputValue1, setInputValue1] = useState("")
    const [loading, setLoading] = useState(false)
    const [_response, setResponse] = useAtom(responseAtom)
    const [_platform, setPlatform] = useAtom(platformAtom)
    const [tokensRequired, setTokensRequired] = useState<string>("")

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const user = auth.currentUser
    useEffect(() => {
        // Set the state to null on page load
    
        setResponse("")
      }, [setResponse])

      useEffect(() => {
        const word = title.split(" ")
        const x = TokensNeeded(title)
        const y = InputTitle(title)
        const z = Descriptions(title)
        setPlatform(title)
        
        setTokensRequired(x)
       
        
        setResponse("")
        setInput("")
        setValue1("")
        setValue("")
        
       
      }, [setPlatform, setResponse, title])

    const handlePostAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value
        const count = value.length
        setPostAboutCount(count)
    
        if (count > 800) {
          value = value.slice(0, 800)
          setPostAboutCount(800)
        }
    
        event.target.value = value
      }


      const generateResponse = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        e.preventDefault()
        if (disabled(input)) return
        setLoading(true)
        setResponse("")
        const tk = await getUserToken(user)
        if (Number(tk) <  Number(tokensRequired)) {
          handleOpen()
          setLoading(false)
          return
        } else {
          let usertk: number = Number(tk) -  Number(tokensRequired)
          const prompt = setPrompt( title, input, value, value1 )
          await updateTokens(user, usertk)
          const res = await fetch("/api/promptChatGPT", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: prompt,
            }),
          })
    
          if (!res.ok) throw new Error(res.statusText)
    
          const data = res.body
          if (!data) return
    
          const reader = data.getReader()
          const decoder = new TextDecoder()
          let done = false
    
          while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            setResponse((prev) => prev + chunkValue)
          }
          setLoading(false)
        }
      }

      useBeforeunload(
        input !== "" || value !== ""  
          ? (event) => event.preventDefault()
          : undefined
      )

  return (
    <div className='flex-col md:flex-row  dark:bg-[#232529] bg-[#F2F2F2] md:px-10 px-4 pt-12	justify-center items-center w-full h-full'>
        <h1 className=" font-sans text-2xl font-bold">{title}</h1>
        <form
          id="generate-form"
          onSubmit={(e) => e.preventDefault()}
          className="my-4"
        >
             <div className="relative">
            <h3 className=" text-lg mt-3 mb-4 dark:text-[#D2D2D2] ">
            Please paste the content you want to Rephrase
              <span className="text-red-500">*</span>
            </h3>
            <textarea
              className="outline-none w-full h-60 px-2 py-4 rounded-lg dark:bg-[#1B1D21] bg-[#FFFFFF] placeholder-[#7D818B]"
              name="Text1" cols={40} rows={5}
              value={input}
              placeholder="gaming, fashion, animals etc."
              onChange={(e) => {
                setInput(e.target.value), handlePostAboutChange(e)
              }}
              
            ></textarea>
            <p className="text-gray-600 text-xs absolute mt-3 right-0 top-[18px]">
              {postAboutCount}/800
            </p>
          </div>
          <h3 className=" text-lg mt-3 mb-1 dark:text-[#D2D2D2]">Rephrase as </h3>
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            id="controllable-states-demo"
            options={options}
            className=" dark:bg-[#1B1D21] bg-white rounded-xl"
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select option"
                InputLabelProps={{
                  style: {
                    fontSize: "15px",
                    color: "#7D818B",
                    outlineStyle: "none",
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: "15px",
                    outlineStyle: "none",
                    color:  "white" ,
                  },
                }}
              />
            )}
          />
                    <h3 className=" text-lg mt-3 mb-1 dark:text-[#D2D2D2]"> Tone </h3>
          <Autocomplete
            value={value1}
            onChange={(event: any, newValue: string | null) => {
              setValue1(newValue)
            }}
            inputValue={inputValue1}
            onInputChange={(event, newInputValue) => {
              setInputValue1(newInputValue)
            }}
            id="controllable-states-demo"
            options={options1}
            className=" dark:bg-[#1B1D21] bg-white rounded-xl"
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select option"
                InputLabelProps={{
                  style: {
                    fontSize: "15px",
                    color: "#7D818B",
                    outlineStyle: "none",
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: "15px",
                    outlineStyle: "none",
                    color:  "white" ,
                  },
                }}
              />
            )}
          />
          <button
            disabled={disabled(input, value, value1)}
            onClick={generateResponse}
            className={`w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#00C5D7] to-[#0077BE] ${
              disabled(input, value, value1) && "cursor-not-allowed"
            }`}
          >
            <h1 className="text-white">
              {" "}
              {loading ? "Genarating..." : `Generate (${tokensRequired} Tokens)`}
            </h1>
          </button>
        </form>
    </div>
  )
}
