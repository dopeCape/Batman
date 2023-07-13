import React, { useState } from "react";
import { useRouter } from "next/router";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = [
  "Conversational",
  "Enthusiastic",
  "Funny",
  "Professional",
  "Describe a tone",
];
export default function ContentCreation() {
  const [alignment, setAlignment] = useState("Improve");
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const router = useRouter();
  const {
    query: { platform, title },
  } = router;

  const props = {
    platform,
    title,
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="w-3/5 h-screen flex bg-gray-200 px-10 py-16 flex-col w-screen">
        <h2 className="text-black text-2xl font-medium">Repurpose content</h2>
        <h3 className="text-gray-500">
          Repurpose content while making it more engaging and effective.
        </h3>

        <h3 className="text-black mt-5 mb-2 text-lg font-medium">
          Repurpose to? *
        </h3>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <div className="flex flex-wrap">
            <ToggleButton value="FaceBook">FaceBook</ToggleButton>
            <ToggleButton value="Twitter">Twitter</ToggleButton>
            <ToggleButton value="Instagram">Instagram</ToggleButton>
            <ToggleButton value="Tiktok">Tiktok</ToggleButton>
            <ToggleButton value="Linkedin">Linkedin</ToggleButton>
          </div>
        </ToggleButtonGroup>

        <h3 className="text-black mt-5 mb-2 text-lg font-medium">
          Text to be rewritten *
        </h3>
        <TextField
          className="bg-white rounded-xl"
          id="outlined-multiline-static"
          label="Text"
          multiline
          rows={4}
        />
        <h3 className="text-black mt-5 mb-2 text-lg font-medium">Tone *</h3>
        <Autocomplete
          className="bg-white rounded-xl"
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
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Tone" />}
        />

        <button className="w-full h-10 bg-black mt-5 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]">
          Generate (1 credit)
        </button>
      </div>
      <div className="w-3/5 mt-20 md:mt-0 h-screen w-screen flex bg-white"></div>
    </div>
  );
}
