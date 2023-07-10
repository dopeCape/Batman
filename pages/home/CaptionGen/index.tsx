import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import AddCircle from "@mui/icons-material/AddCircleOutlineTwoTone";
import Cancel from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GPTResponse from "@/components/GPTResponse";
import { useAtom } from "jotai";
import Box from "@mui/material/Box";
import { responseAtom } from "@/utils/store";
import { auth } from "@/firebase";
import { Modal } from "@mui/material";
import { updateTokens, readTokens, getUserToken } from "../../../auth";
import { StyleModal } from "@/components/modalStyle";
import PopUpCard from "@/components/PopUpCard";
const options = [
  "Conversational",
  "Enthusiastic",
  "Funny",
  "Professional",
  "Describe a tone",
];

export default function CaptionGen() {
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
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  let token: number = 10;
  const user = auth.currentUser;
  const prompt = `Generate a catpion for my post about ${input} with keywords ${keywords} with tone ${value} with target audience ${targetAudience} .`;

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

  useEffect(() => {
    // Set the state to null on page load
    setResponse("");
  }, []);
  const TextInput = () => {
    return (
      <input
        className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500 mt-2"
        placeholder="Describe a tone"
        type="text"
      ></input>
    );
  };

  const {
    query: { platform, title },
  } = router;

  const props = {
    platform,
    title,
  };

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
    // e.preventDefault();
    setLoading(true);
    const tk = await getUserToken(user);
    console.log("&&&&&&&&&&&&&&thus " + tk);
    if (Number(tk) < token) {
      // alert("You don't have enough tokens")
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
      console.log("********************" + data);
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
    <div className="flex justify-center items-center z-0">
      <div className="w-3/5 h-screen flex bg-gray-200 px-10 py-16 flex-col">
        <h1 className="text-black font-sans text-2xl font-medium">
          Generate {props.title}
        </h1>
        <h3 className="text-black text-sm ">
          Optimize your captions for greater visibility and higher engagement.
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="my-4">
          <div className="relative">
            <h3 className="text-black text-base mb-2">
              What's your post about?*
            </h3>
            <input
              className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500"
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

          <h3 className="text-black text-base mb-2 mt-3">Keywords*</h3>
          <div className="flex flex-row">
            <input
              onChange={handleKeyword}
              value={word}
              className="w-4/5 px-2 py-2 border border-gray-300 rounded-lg text-gray-500"
              type="text"
              placeholder="gaming, fashion, animals"
            ></input>
            <button
              onClick={addKeyword}
              className="cursor-pointer bg-white w-1/5 flex justify-center items-center border border-gray-300 rounded-lg"
            >
              <AddCircle className="bg-gray-500 rounded-xl" />
            </button>
          </div>
          {keywords.length > 0 ? <KeywordsComp /> : null}

          <h3 className="text-black text-base mb-2 mt-3">Tone*</h3>
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
            sx={{ width: "60%", backgroundColor: "white" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Tone"
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: "14px",
                    color: "gray",
                  },
                }}
              />
            )}
          />
          {inputValue === "Describe a tone" ? <TextInput /> : null}

          <div className="relative">
            <h3 className="text-black text-base mb-2 mt-3">Target audience*</h3>
            <input
              className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500"
              type="text"
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
            onClick={generateResponse}
            className="w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]"
          >
            {loading ? "Genarating..." : "Genarate (10 tokens)"}
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

      <div className=" h-screen flex bg-white"></div>
      <GPTResponse></GPTResponse>
    </div>
  );
}
