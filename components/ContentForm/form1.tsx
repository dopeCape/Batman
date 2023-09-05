import React from "react";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useBeforeunload } from "react-beforeunload";
import { updateTokens, readTokens, getUserToken } from "../../auth";
import { responseAtom } from "@/utils/store";
import { auth } from "@/firebase";
import { Modal, Box } from "@mui/material";
import { StyleModal } from "@/components/modalStyle";
import { Descriptions, setPrompt, TokensNeeded } from "@/hooks/function";
import PopUpCard from "@/components/PopUpCard";
type MainSelectorProps = {
  title: string; // Adjust the type according to your use case
};

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

export default function Form1({ title }: MainSelectorProps) {
  const [value, setValue] = useState<string | null>();
  const [keywords, setKeywords] = useState<string>();
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [postAboutCount, setPostAboutCount] = useState(0);
  const [targetAudienceCount, setTargetAudienceCount] = useState(0);
  const [targetAudience, setTargetAudience] = useState("");
  const [input, setInput] = useState("");
  const [_response, setResponse] = useAtom(responseAtom);
  const [loading, setLoading] = useState(false);
  const [tokensRequired, setTokensRequired] = useState<string>("");
  let token: number = 20;
  const user = auth.currentUser;
  const router = useRouter();
  const [getToken, setgetToken] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [desc, setDesc] = useState<string>("")
  const [word1, setWord1] = useState<string>("");
  useEffect(() => {
    // Set the state to null on page load
    setResponse("");
  }, [setResponse]);
  useEffect(() => {
    const word = title.split(" ");
    setWord1(word[1]);
    const x = TokensNeeded(title);
    const y = Descriptions(title)
    setDesc(y)
    setTokensRequired(x);
  }, [title]);

  useBeforeunload(input !== "" ? (event) => event.preventDefault() : undefined);

  const TextInput = () => {
    return (
      <input
        className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500 mt-2"
        placeholder="Describe a tone"
        type="text"
      ></input>
    );
  };

  const prompt = `Generate 30 hashtags about ${input} in one sentence`;

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
    if (disabled(input)) return;
    setLoading(true);
    const tk = await getUserToken(user);
    if (Number(tk) < Number(tokensRequired)) {
      handleOpen();
      setLoading(false);
      return;
    } else {
      // const prompt = setPrompt(title, input )
      let usertk: number = Number(tk) - Number(tokensRequired);
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
    <div className="  flex flex-col md:flex-row	justify-center items-center w-full h-full">
      <div className="w-full h-screen flex dark:bg-[#232529] bg-[#F2F2F2] md:px-10 px-5 md:py-16 py-8 flex-col">
        <h1 className=" font-sans text-2xl font-bold">Generate {title} idea</h1>
        <h3 className=" text-sm ">
        {desc.replace(/'/g, "&rsquo;")}
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="my-4">
          <div className="relative">
            <h3 className=" text-lg mt-3 mb-1 dark:text-[#D2D2D2]">
              What&apos;s your {word1.toLowerCase()} about?{" "}
              <span className="text-red-500">*</span>
            </h3>
            <input
              className=" outline-none w-full px-2 py-4 rounded-lg  dark:bg-[#1B1D21]"
              type="text"
              placeholder="gaming, fashion, animals etc."
              onChange={(e) => {
                setInput(e.target.value), handlePostAboutChange(e);
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {postAboutCount}/800
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
              {loading ? "Genarating..." : "Generate"}
            </h1>
          </button>
          <div className="flex w-full h-4 items-center justify-center my-2">
            <h1 className="self-center flex text-sm text-[#7D818B]">
              ({tokensRequired} tokens)
            </h1>
          </div>
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
