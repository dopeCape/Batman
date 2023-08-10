import React from 'react'
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import AddCircle from "@mui/icons-material/AddCircleOutlineTwoTone";
import Cancel from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GPTResponseVideo from "@/components/GPTResponseVideo";
import { useAtom } from "jotai";
import { updateTokens, readTokens, getUserToken } from "../../auth";
import { responseAtom } from "@/utils/store";
import { auth } from "@/firebase";
import { Modal, Box } from "@mui/material";
import { StyleModal } from "@/components/modalStyle";
import PopUpCard from "@/components/PopUpCard";

const options = [
"Conversational",
"Enthusiastic",
"Funny",
"Professional",
"Describe a tone",
];

export const disabled = (...args: any[]) => {
return args.some(
  (arg) =>
    (typeof arg === "string" && arg?.trim().length === 0) ||
    (typeof arg === "object" && arg?.length === 0)
);
};
type MainSelectorProps = {
    title: string; // Adjust the type according to your use case
  };
export default function Form4({title}:MainSelectorProps) {


  const [value, setValue] = useState<string | null>();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [postAboutCount, setPostAboutCount] = useState(0);
  const [targetAudienceCount, setTargetAudienceCount] = useState(0);
  const [targetAudience, setTargetAudience] = useState("");
  const [input, setInput] = useState("");
  const [_response, setResponse] = useAtom(responseAtom);
  const [loading, setLoading] = useState(false);
  let token: number = 20;
  const user = auth.currentUser;
  const router = useRouter();
  const [getToken, setgetToken] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Set the state to null on page load
    setResponse("");
  }, [setResponse]);

  const handleKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const addKeyword = () => {
    if (word.trim() !== "") {
      setKeywords((prevKeywords) => [...prevKeywords, word]);
      setWord("");
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  const KeywordsComp = () => {
    return (
      <div className="flex flex-row">
        {keywords.map((word, index) => (
          <div
            key={index}
            className="mx-1 px-2 border border-gray-300 bg-white flex-row flex"
          >
            <Cancel
              className="bg-black w-0.5 h-0.5"
              onClick={() => removeKeyword(index)}
            />
            <p className="text-gray-800">{word}</p>
          </div>
        ))}
      </div>
    );
  };

  const TextInput = () => {
    return (
      <input
        className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500 mt-2"
        placeholder="Describe a tone"
        type="text"
      ></input>
    );
  };



  const prompt = `Generate five ${title} about ${input} and should inclue keywords like ${keywords} with ${value} tone and with target audience ${targetAudience} make sure that every idea should be seperated.`;

  const handlePostAboutChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    const count = value.length;
    setPostAboutCount(count);

    if (count > 800) {
      value = value.slice(0, 800);
      setPostAboutCount(800);
    }

    event.target.value = value;
  };

  const handleTargetAudienceChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    const count = value.length;
    setTargetAudienceCount(count);

    if (count > 200) {
      value = value.slice(0, 200);
      setTargetAudienceCount(200);
    }

    event.target.value = value;
  };

  const generateResponse = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (disabled(value, input, targetAudience, keywords)) return;
    setLoading(true);
    const tk = await getUserToken(user);
    if (Number(tk) < token) {
      handleOpen();
      setLoading(false);
      return;
    } else {
      let usertk: number = Number(tk) - Number(token);
      // e.preventDefault();
      setResponse("");

      await updateTokens(user, usertk);
      const res = await fetch("/api/promptChatGPT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: prompt,
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = res.body;

      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResponse((prev) => prev + chunkValue);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row	justify-center items-center w-full h-full">
      <div className="w-full h-screen flex dark:bg-[#232529] bg-gray-200 px-10 py-16 flex-col">
        <h1 className=" font-sans text-2xl font-bold">
          Generate {title}
        </h1>
        <h3 className="text-sm  ">
          Optimize your content for greater visibility and higher engagement.
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="my-4">
          <div className="relative">
            <h3 className=" text-lg my-3 dark:text-[#A7A7A7]">
              What&apos;s your post about? <span className='text-red-500'>*</span>
            </h3>
            <input
              className="w-full px-2 py-2 rounded-lg bg-[#1B1D21]"
              type="text"
              placeholder="gaming, fashion, animals etc."
              onChange={(e) => {
                setInput(e.target.value), handlePostAboutChange;
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {postAboutCount}/800
            </p>
          </div>

          <h3 className=" text-lg my-3 dark:text-[#A7A7A7]">Keywords <span className='text-red-500'>*</span></h3>
          <div className="flex flex-row">
            <input
              onChange={handleKeyword}
              value={word}
              className="w-4/5 px-2 py-2 bg-[#1B1D21] rounded-lg "
              type="text"
              placeholder="gaming, fashion, animals"
            ></input>
            <button
              onClick={addKeyword}
              className="cursor-pointer dark:bg-[#1B1D21] bg-white w-1/5 flex justify-center items-center  rounded-lg"
            >
              <AddCircle className="bg-gray-500 rounded-xl" />
            </button>
          </div>
          {keywords.length > 0 ? <KeywordsComp /> : null}

          <h3 className=" text-lg my-3 dark:text-[#A7A7A7]">Tone <span className='text-red-500'>*</span></h3>
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
            className=' dark:bg-[#1B1D21] bg-white rounded-xl'
            sx={{ width: "60%", }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Tone"
                InputLabelProps={{
                  style: {
                    fontSize: "14px",
                    color: "#7D818B",
                    outlineStyle:'none'
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: "14px",
                    outlineStyle:'none',
                    color: "#7D818B"
                  },
                }}
              />
            )}
          />
          {inputValue === "Describe a tone" ? <TextInput /> : null}

          <div className="relative">
            <h3 className=" text-lg my-3 dark:text-[#A7A7A7]">Target audience <span className='text-red-500'>*</span></h3>
            <input
              className="w-full px-2 py-2 rounded-lg  bg-[#1B1D21]"
              type="text"
              value={targetAudience}
              placeholder="travellers, gamers etc."
              onChange={(e) => {
                setTargetAudience(e.target.value), handleTargetAudienceChange;
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {targetAudienceCount}/200
            </p>
          </div>

          <button
            disabled={disabled(value, input, targetAudience, keywords)}
            onClick={generateResponse}
            className={`w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72] ${
              disabled(value, input, targetAudience, keywords) &&
              "cursor-not-allowed"
            }`}
          >
            <h1 className="text-white">
              {" "}
              {loading ? "Genarating..." : "Generate (20 tokens)"}
            </h1>
          </button>
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
  );
}

  