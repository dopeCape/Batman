import React from 'react'
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GPTResponse from "@/components/GPTRespone";
import { useAtom } from "jotai";
import { responseAtom } from "@/utils/store";
import { updateTokens, readTokens, getUserToken } from "../../auth";
import { Modal, Box } from "@mui/material";
import { StyleModal } from "@/components/modalStyle";
import PopUpCard from "@/components/PopUpCard";
import { disabled } from "./form4";

const options = [
  "Conversational",
  "Enthusiastic",
  "Funny",
  "Professional",
  "Describe a tone",
];

type MainSelectorProps = {
    title: string; // Adjust the type according to your use case
  };
export default function Form3({title}:MainSelectorProps) {
  
    const [value, setValue] = useState<string | null>();
    const [inputValue, setInputValue] = useState("");
    const [postAboutCount, setPostAboutCount] = useState(0);
    const [targetAudienceCount, setTargetAudienceCount] = useState(0);
    const [targetAudience, setTargetAudience] = useState("");
    const [input, setInput] = useState("");
    const [_response, setResponse] = useAtom(responseAtom);
    const [loading, setLoading] = useState(false);
    let token: number = 5;
    const user = auth.currentUser;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
      // Set the state to null on page load
      setResponse("");
    }, [setResponse]);
  
    const TextInput = () => {
      return (
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500 mt-2"
          placeholder="Describe a tone"
          type="text"
        ></input>
      );
    };
  

  
    const prompt = `Generate a ${title} about ${input} with tone ${value} with target audience ${targetAudience}  and every idea should be seperated.`;
  
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
      if (disabled(value, input, targetAudience, inputValue)) return;
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
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-full h-screen flex  dark:bg-[#232529]  bg-[#F2F2F2] px-10 py-16 flex-col">
          <h1 className="font-sans text-2xl font-bold">
            Generate {title}
          </h1>
          <h3 className="text-sm ">
            Optimize your Thumbnails for greater visibility and higher engagement.
          </h3>
          <form onSubmit={(e) => e.preventDefault()} className="my-4">
            <div className="relative mt-4">
              <h3 className="text-lg my-3 ">
                What&apos;s your post about? <span className='text-red-500'>*</span>
              </h3>
              <input
                className=" outline-none w-full px-2 py-2 rounded-lg  dark:bg-[#1B1D21] bg-[#FFFFFF]"
                type="text"
                placeholder="gaming, fashion, animals etc."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value), handlePostAboutChange(e);
                }}
              ></input>
              <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
                {postAboutCount}/800
              </p>
            </div>
  
            <h3 className="text-lg my-3 ">Tone <span className='text-red-500'>*</span></h3>
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
              className="dark:bg-[#1B1D21] bg-white rounded-md"
              sx={{ width: "60%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Tone"
                  InputLabelProps={{
                    style: {
                      fontSize: "14px",
                      color: "#7D818B", 
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      fontSize: "14px",
                      color: "white",
                    },
                  }}
                />
              )}
            />
            {inputValue === "Describe a tone" ? <TextInput /> : null}
  
            <div className="relative">
              <h3 className="text-lg my-3 ">Target audience <span className='text-red-500'>*</span></h3>
              <input
                className="w-full px-2 py-2 rounded-lg dark:bg-[#1B1D21] bg-[#FFFFFF] outline-none"
                type="text"
                placeholder="travellers, gamers etc."
                value={targetAudience}
                onChange={(e) => {
                  setTargetAudience(e.target.value), handleTargetAudienceChange(e);
                }}
              ></input>
              <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
                {targetAudienceCount}/200
              </p>
            </div>
  
            <button
              disabled={disabled(value, input, targetAudience, inputValue)}
              onClick={generateResponse}
              className={`w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72] ${
                disabled(value, input, targetAudience, inputValue) &&
                "cursor-not-allowed"
              }`}
            >
              <h1 className="text-white">
                {" "}
                {loading ? "Genarating..." : "Generate (5 tokens)"}
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
        
      </div>
    );
  }

