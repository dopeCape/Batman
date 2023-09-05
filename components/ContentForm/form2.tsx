import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { useBeforeunload } from "react-beforeunload";
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
import { disabled } from "./form4";
import { useTheme } from "next-themes";
import { Descriptions, setPrompt, TokensNeeded } from "@/hooks/function";

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

export default function Form2({ title }: MainSelectorProps) {
  const [value, setValue] = useState<string | null>();
  const [value1, setValue1] = useState<string | null>();
  const [value2, setValue2] = useState<string | null>();
  const [keywords, setKeywords] = useState<string>();
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
  const { theme, setTheme } = useTheme();
  const [desc, setDesc]  = useState<string>("")
  const [tokensRequired, setTokensRequired] = useState<string>("");
  let token: number = 10;
  const user = auth.currentUser;
  const router = useRouter();
  const [word1, setWord1] = useState<string>("");

  useEffect(() => {
    // Set the state to null on page load
    setResponse("");
  }, [setResponse]);
  useEffect(() => {
    const word = title.split(" ");
    setWord1(word[1]);
    const y = Descriptions(title)
    setDesc(y)
    setResponse("");
    setInput("");
    setTargetAudience("");
    setValue("");
    setKeywords("");
    const x = TokensNeeded(title);

    setTokensRequired(x);
  }, [title]);

  const handleKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const TextInput = () => {
    return (
      <input
        className="w-full px-2 py-4 rounded-lg border border-gray-300 text-gray-500 mt-2"
        placeholder="Describe a tone"
        type="text"
      ></input>
    );
  };

  // const prompt = `Generate ${title} about ${input} which is related to ${value1} industry, the post type is ${value2}  with keywords ${keywords} with tone ${value} and my target audience is ${targetAudience}.`;

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
    setResponse("");
    const tk = await getUserToken(user);
    if (Number(tk) < Number(tokensRequired)) {
      handleOpen();
      setLoading(false);
      return;
    } else {
      let usertk: number = Number(tk) - Number(tokensRequired);
      const prompt = setPrompt(
        title,
        input,
        targetAudience,
        value,
        keywords,
        value1,
        value2
      );
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
      <div className=" h-full flex dark:bg-[#232529] bg-[#F2F2F2] px-10 py-14 flex-col overflow-scroll">
        <h1 className="font-sans text-2xl font-bold">
          Generate {title.replace(/'/g, "&rsquo;")} idea
        </h1>
        <h3 className="text-sm ">
        {desc.replace(/'/g, "&rsquo;")}
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="my-4">
          <div className="relative">
            <h3 className="text-lg my-3 dark:text-[#A7A7A7]">
              What&apos;s your post about?{" "}
              <span className="text-red-500">*</span>
            </h3>
            <input
              className="outline-none w-full px-2 py-4 rounded-lg dark:bg-[#1B1D21] placeholder-[#7D818B]"
              type="text"
              placeholder="Tech, Career Advice, Industry Trend etc."
              onChange={(e) => {
                setInput(e.target.value);
                handlePostAboutChange(e);
              }}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {postAboutCount}/800
            </p>
          </div>

          <h3 className="text-lg my-3 dark:text-[#A7A7A7]">Industry </h3>
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
            sx={{ width: "100%" }}
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
                    color: theme === "dark" ? "white" : "black",
                  },
                }}
              />
            )}
          />

          <h3 className="text-lg my-3 dark:text-[#A7A7A7]">Post Type </h3>
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
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Post Type"
                InputLabelProps={{
                  style: {
                    fontSize: "15px",
                    color: "#7D818B", // Change the color here
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: "15px",
                    color: theme === "dark" ? "white" : "black",
                  },
                }}
              />
            )}
          />

          <h3 className="text-lg my-3 dark:text-[#A7A7A7]">Keywords</h3>
          <div className="flex flex-row">
            <input
              onChange={(e) => {
                setKeywords(e.target.value);
              }}
              className="w-full px-2 py-4 borderoutline-none dark:bg-[#1B1D21]  rounded-lg placeholder-[#7D818B]"
              type="text"
              placeholder="AI, future, responsible etc"
            ></input>
          </div>

          <h3 className="text-lg my-3 dark:text-[#A7A7A7]">Tone </h3>
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
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Tone"
                InputLabelProps={{
                  style: {
                    fontSize: "15px",
                    color: "#7D818B", // Change the color here
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: "15px",
                    color: theme === "dark" ? "white" : "black",
                  },
                }}
              />
            )}
          />
          {inputValue === "Describe a tone" ? <TextInput /> : null}

          <div className="relative">
            <h3 className="text-lg my-3 dark:text-[#A7A7A7]">
              Target audience{" "}
            </h3>
            <input
              className="w-full px-2 py-4 outline-none dark:bg-[#1B1D21]  rounded-lg placeholder-[#7D818B] "
              type="text"
              placeholder="prospective employee/employer etc."
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
    </div>
  );
}
