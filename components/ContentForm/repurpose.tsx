import React,{useState, ChangeEvent} from 'react'
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
type MainSelectorProps = {
    title: string // Adjust the type according to your use case
  }
  const options = [
    "YouTube",
    "Twitter",
    "Instagram",
    "Facebook",
    "TikTok",
    "LinkedIn"
  ]
export default function Repurpose({ title }: MainSelectorProps) {
    const [postAboutCount, setPostAboutCount] = useState(0)
    const [value, setValue] = useState<any>("")
    const [input, setInput] = useState("")
    const [inputValue, setInputValue] = useState("")
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
            Please paste the content you want to Repurpose
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
                    color:  "white" ,
                  },
                }}
              />
            )}
          />
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
                    color:  "white" ,
                  },
                }}
              />
            )}
          />
        </form>
    </div>
  )
}
