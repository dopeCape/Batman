import React from "react"
import { useState, ChangeEvent, useEffect } from "react"
import { useRouter } from "next/router"
import { useBeforeunload } from "react-beforeunload"
import AddCircle from "@mui/icons-material/AddCircleOutlineTwoTone"
import Cancel from "@mui/icons-material/Cancel"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import GPTResponseVideo from "@/components/GPTResponseVideo"
import { useAtom } from "jotai"
import { updateTokens, readTokens, getUserToken } from "../../auth"
import { platformAtom, responseAtom } from "@/utils/store"
import { auth } from "@/firebase"
import { Modal, Box, OutlinedInput } from "@mui/material"
import { StyleModal } from "@/components/modalStyle"
import PopUpCard from "@/components/PopUpCard"
import { useTheme } from "next-themes"
import { setPrompt, TokensNeeded, InputTitle, Descriptions } from "@/hooks/function"

const options = [
  "Conversational",
  "Enthusiastic",
  "Funny",
  "Professional",
  "Describe a tone",
]

export const disabled = (...args: any[]) => {
  return args.some(
    (arg) =>
      (typeof arg === "string" && arg?.trim().length === 0) ||
      (typeof arg === "object" && arg?.length === 0)
  )
}
type MainSelectorProps = {
  title: string // Adjust the type according to your use case
}
export default function Form4({ title }: MainSelectorProps) {
  const [value, setValue] = useState<any>("")
  const [keywords, setKeywords] = useState<string>()
  const [word, setWord] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [postAboutCount, setPostAboutCount] = useState(0)
  const [targetAudienceCount, setTargetAudienceCount] = useState(0)
  const [targetAudience, setTargetAudience] = useState("")
  const [input, setInput] = useState("")
  const [_response, setResponse] = useAtom(responseAtom)
  const [_platform, setPlatform] = useAtom(platformAtom)
  const [loading, setLoading] = useState(false)
  const [word1, setWord1] = useState<string>("")
  const [tokensRequired, setTokensRequired] = useState<string>("")
  let token: number = 20
  const user = auth.currentUser
  const router = useRouter()
  const [getToken, setgetToken] = useState("")
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [titleInput, setTitleInput] = useState("")
  const [description, setDescription] = useState("")
  const { theme, setTheme } = useTheme()
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
    setTitleInput(y)
    setTokensRequired(x)
    setDescription(z)
    setWord1(word[1])
    setResponse("")
    setInput("")
    setTargetAudience("")
    setValue("")
    setKeywords("")
   
  }, [setResponse, title])
  const handleKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }

  const TextInput = () => {
    return (
      <input
        className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500 mt-2"
        placeholder="Describe a tone"
        type="text"
      ></input>
    )
  }

  // const prompt = `Generate one ${title} about ${input} ${keywords?`and should inclue keywords like ${keywords}`: null} ${value?`with ${value} tone`:null} ${targetAudience?`and with target audience ${targetAudience}`:null}`
  // const prompt = `Generate 5 ${title} for a video about ${input}. Use the following keywords: ${keywords}. The tone should be ${value}, targeting a ${targetAudience}.`
  const handlePostAboutChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    const count = value.length
    setPostAboutCount(count)

    if (count > 800) {
      value = value.slice(0, 800)
      setPostAboutCount(800)
    }

    event.target.value = value
  }

  const handleTargetAudienceChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    const count = value.length
    setTargetAudienceCount(count)

    if (count > 200) {
      value = value.slice(0, 200)
      setTargetAudienceCount(200)
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
      const prompt = setPrompt(title, input, targetAudience, value, keywords)
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
    input !== "" || keywords !== "" || value !== "" || targetAudience !== ""
      ? (event) => event.preventDefault()
      : undefined
  )

  return (
    <div className="flex flex-col md:flex-row	justify-center items-center w-full h-full">
      <div className="w-full h-screen flex dark:bg-[#232529] bg-[#F2F2F2] md:px-10 px-4 pt-12 flex-col">
        <h1 className=" font-sans text-2xl font-bold">
          Generate {title.replace(/'/g, "&rsquo;")} 
        </h1>
        <h3 className="text-sm  ">
          {description}
        </h3>
        <form
          id="generate-form"
          onSubmit={(e) => e.preventDefault()}
          className="my-4"
        >
          <div className="relative">
            <h3 className=" text-lg mt-3 mb-1 dark:text-[#D2D2D2]">
             {titleInput}
              <span className="text-red-500">*</span>
            </h3>
            <input
              className="outline-none w-full px-2 py-4 rounded-lg dark:bg-[#1B1D21] bg-[#FFFFFF] placeholder-[#7D818B]"
              type="text"
              value={input}
              placeholder="gaming, fashion, animals etc."
              onChange={(e) => {
                setInput(e.target.value), handlePostAboutChange(e)
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {postAboutCount}/800
            </p>
          </div>

          <h3 className="text-lg my-3 dark:text-[#D2D2D2]">Keywords</h3>

          <input
            onChange={(e) => {
              setKeywords(e.target.value)
            }}
            value={keywords}
            className="w-full px-2 py-4 borderoutline-none dark:bg-[#1B1D21] outline-none  rounded-lg placeholder-[#7D818B]"
            type="text"
            placeholder="gaming, fashion, animals"
          ></input>

          <h3 className=" text-lg mt-3 mb-1 dark:text-[#D2D2D2]">Tone </h3>
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
                label="Select Tone"
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
                    color:  `${theme==="light"?"black":"white"}`,
                  },
                }}
              />
            )}
          />
          {inputValue === "Describe a tone" ? <TextInput /> : null}

          <div className="relative">
            <h3 className=" text-lg mt-3 mb-1 dark:text-[#D2D2D2]">
              Target audience{" "}
            </h3>
            <input
              className="outline-none w-full px-2 py-4 rounded-lg  dark:bg-[#1B1D21] bg-[#FFFFFF] placeholder-[#7D818B]"
              type="text"
              value={targetAudience}
              placeholder="travellers, gamers etc."
              onChange={(e) => {
                setTargetAudience(e.target.value), handleTargetAudienceChange(e)
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {targetAudienceCount}/200
            </p>
          </div>

          <button
            disabled={disabled(input)}
            onClick={generateResponse}
            className={`w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#00C5D7] to-[#0077BE] ${
              disabled(input) && "cursor-not-allowed"
            }`}
          >
            <h1 className="text-white">
              {" "}
              {loading ? "Genarating..." : `Generate (${tokensRequired} Tokens)`}
            </h1>
          </button>
          {/* <div className="flex w-full h-4 items-center justify-center my-2">
            <h1 className="self-center flex text-sm text-[#7D818B]">
              ({tokensRequired} tokens)
            </h1>
          </div> */}
        </form>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={StyleModal}>
          <PopUpCard></PopUpCard>
        </Box>
      </Modal>
      {/* <div className=" h-screen w-screen flex bg-white">
        {/* <GPTResponseVideo></GPTResponseVideo> */}
      {/* </div> */}
    </div>
  )
}
