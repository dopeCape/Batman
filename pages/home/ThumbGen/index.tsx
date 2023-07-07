import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import AddCircle from "@mui/icons-material/AddCircleOutlineTwoTone";
import Cancel from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = [
  "Conversational",
  "Enthusiastic",
  "Funny",
  "Professional",
  "Describe a tone",
];

export default function ThumbGen() {
  const [value, setValue] = useState<string | null>();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [postAboutCount, setPostAboutCount] = useState(0);
  const [targetAudienceCount, setTargetAudienceCount] = useState(0);
  const router = useRouter();


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

  return (
    <div className="flex justify-center items-center">
      <div className="w-2/5 h-screen flex bg-gray-200 px-10 py-16 flex-col ">
        <h1 className="text-black font-sans text-2xl font-medium">
          Generate {props.title}
        </h1>
        <h3 className="text-black text-sm ">
          Optimize your Thumbnail for greater visibility and higher engagement.
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
              onChange={handlePostAboutChange}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {postAboutCount}/800
            </p>
          </div>

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
              onChange={handleTargetAudienceChange}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {targetAudienceCount}/200
            </p>
          </div>

          <button className="w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]">
            Generate (1 credit)
          </button>
        </form>
      </div>
      <div className="w-3/5 h-screen flex bg-white"></div>
    </div>
  );
}


