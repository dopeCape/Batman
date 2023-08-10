import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import AddCircle from "@mui/icons-material/AddCircleOutlineTwoTone";
import Cancel from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GPTResponse from "@/components/GPTRespone";
import { auth } from "@/firebase";
import { updateTokens, readTokens, getUserToken } from "../../auth";
import { useAtom } from "jotai";
import { responseAtom } from "@/utils/store";
import { Modal, Box } from "@mui/material";
import { StyleModal } from "@/components/modalStyle";
import PopUpCard from "@/components/PopUpCard";
import { disabled } from "../../pages/home/VideoGen";
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

const industries = [
  "Finance",
  "Healthcare",
  "Technology",
  "Marketing",
  "Education",
  "Consulting",
  "Manufacturing",
];
const post = [
  "Industry Insights",
  "Expert Interviews",
  "Career Advice",
  "Case Studies",
  "Thought Leadership Articles",
];

export default function Form2({title}:MainSelectorProps) {
  const [value, setValue] = useState<string | null>();
  const [value1, setValue1] = useState<string | null>();
  const [value2, setValue2] = useState<string | null>();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [postType, setPostType] = useState("");
  const [industry, setIndustry] = useState("");
  const [postAboutCount, setPostAboutCount] = useState(0);
  const [targetAudienceCount, setTargetAudienceCount] = useState(0);
  const [targetAudience, setTargetAudience] = useState("");
  const [_response, setResponse] = useAtom(responseAtom);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let token: number = 10;
  const user = auth.currentUser;
  const router = useRouter();

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

  const prompt = `Generate ${title} about ${input} which is related to ${value1} industry, the post type is ${value2}  with keywords ${keywords} with tone ${value} and my target audience is ${targetAudience}.`;

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
    if (disabled(value1, value2, input, targetAudience, keywords)) return;
    setLoading(true);
    setResponse("");
    const tk = await getUserToken(user);
    if (Number(tk) < token) {
      handleOpen();
      setLoading(false);
      return;
    } else {
      let usertk: number = Number(tk) - Number(token);

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
    <div className="flex justify-center items-cente h-screen w-screen">
      <div className=" h-full flex dark:bg-[#232529] bg-gray-200 px-10 py-14 flex-col overflow-scroll">
        <h1 className="font-sans text-2xl font-medium">
          Generate {title}
        </h1>
        <h3 className="text-sm ">
          Optimize your LinkedIn post for greater visibility and higher
          engagement.
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="my-4">
          <div className="relative">
            <h3 className="text-base mb-2">
              What&apos;s your post about? <span className="text-red-500">*</span>
            </h3>
            <input
              className="outline-none w-full px-2 py-2 rounded-lg dark:bg-[#1B1D21]"
              type="text"
              placeholder="gaming, fashion, animals etc."
              onChange={(e) => {
                setInput(e.target.value); handlePostAboutChange(e);
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {postAboutCount}/800
            </p>
          </div>

          <h3 className="text-base mb-2 mt-3">Industry <span className="text-red-500">*</span></h3>
          <Autocomplete
            value={value1}
            onChange={(event: any, newValue: string | null) => {
              setValue1(newValue);
            }}
            inputValue={industry}
            onInputChange={(event, newInputValue) => {
              setIndustry(newInputValue);
            }}
            id="controllable-states-demo"
            options={industries}
            className="dark:bg-[#1B1D21] bg-white rounded-md"
            sx={{ width: "60%" }}
            renderInput={(params) => (
              <TextField
              
                {...params}
                label="Select Industry"
                InputLabelProps={{
                  style: {
                    fontSize: "14px",
                    color: "#7D818B", // Change the color here
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

          <h3 className="text-base mb-2 mt-3">Post Type <span className="text-red-500">*</span></h3>
          <Autocomplete
            value={value2}
            onChange={(event: any, newValue: string | null) => {
              setValue2(newValue);
            }}
            inputValue={postType}
            onInputChange={(event, newInputValue) => {
              setPostType(newInputValue);
            }}
            id="controllable-states-demo"
            options={post}
            className="dark:bg-[#1B1D21] bg-white rounded-md"
            sx={{ width: "60%",   }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Industry"
                InputLabelProps={{
                  style: {
                    fontSize: "14px",
                    color: "#7D818B", // Change the color here
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

          <h3 className="text-base mb-2 mt-3">Keywords <span className="text-red-500">*</span></h3>
          <div className="flex flex-row">
            <input
              onChange={handleKeyword}
              value={word}
              className="w-4/5 px-2 py-2 borderoutline-none dark:bg-[#1B1D21]  rounded-lg"
              type="text"
              placeholder="gaming, fashion, animals"
            ></input>
            <button
              onClick={addKeyword}
              className="cursor-pointer dark:bg-[#1B1D21] bg-white w-1/5 flex justify-center items-center rounded-lg"
            >
              <AddCircle className="bg-gray-500 rounded-xl" />
            </button>
          </div>
          {keywords.length > 0 ? <KeywordsComp /> : null}

          <h3 className="text-base mb-2 mt-3">Tone <span className="text-red-500">*</span></h3>
          <Autocomplete
            className="dark:bg-[#1B1D21] bg-white rounded-md"
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
            sx={{ width: "60%",  }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Tone"
                InputLabelProps={{
                  style: {
                    fontSize: "14px",
                    color: "#7D818B", // Change the color here
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
            <h3 className="text-base mb-2 mt-3">Target audience <span className="text-red-500">*</span></h3>
            <input
              className="w-full px-2 py-2 outline-none dark:bg-[#1B1D21]  rounded-lg  "
              type="text"
              placeholder="travellers, gamers etc."
              value={targetAudience}
              onChange={(e) => {
                setTargetAudience(e.target.value), handleTargetAudienceChange;
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {targetAudienceCount}/200
            </p>
          </div>

          <button
            disabled={disabled(value1, value2, input, targetAudience, keywords)}
            onClick={generateResponse}
            className={`w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72] ${
              disabled(value1, value2, input, targetAudience, keywords) &&
              "cursor-not-allowed"
            }`}
          >
            <h1 className="text-white">
              {" "}
              {loading ? "Genarating..." : "Generate (10 tokens)"}
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
