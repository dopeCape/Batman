import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GPTResponse from "@/components/GPTResponse";
import { useAtom } from "jotai";
import { responseAtom } from "@/utils/store";
import { auth } from "@/firebase";
import { updateTokens, readTokens, getUserToken } from "../../../auth";
import { Modal, Box } from "@mui/material";
import { StyleModal } from "@/components/modalStyle";
import PopUpCard from "@/components/PopUpCard";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const options = [
  "Conversational",
  "Enthusiastic",
  "Funny",
  "Professional",
  "Describe a tone",
];

export default function ContentCreation() {
  const [alignment, setAlignment] = useState("Improve");
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [_response, setResponse] = useAtom(responseAtom);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    // Set the state to null on page load
    setResponse("");
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const generateResponse = async () => {
    setLoading(true);
    setResponse("");
    const tk = await getUserToken(user);
    // Check if user has enough tokens
    if (Number(tk) < 1) {
      handleOpen();
      setLoading(false);
      return;
    } else {
      // Deduct tokens from the user
      let usertk: number = Number(tk) - 1;
      await updateTokens(user, usertk);

      // Generate the prompt using the selected options
      const prompt = `Repurpose the content to ${alignment} it. The text to be rewritten is: ${inputValue}. The desired tone is ${value}.`;

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    query: { platform, title },
  } = router;

  const props = {
    platform,
    title,
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="md:w-3/5 md:h-screen flex bg-gray-200 px-10 py-16 flex-col">
        <h2 className="text-black text-2xl font-medium"> Repurpose content</h2>
        <h3 className="text-gray-500">
          Repurpose content while making it more engaging and effective.
        </h3>

        <h3 className="text-black mt-5 mb-2 text-lg font-medium">
          What do you want to do? *
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
            <ToggleButton value="Instagram">Instagram</ToggleButton>
            <ToggleButton value="Tiktok">Tiktok</ToggleButton>
            <ToggleButton value="Twitter">Twitter</ToggleButton>
            <ToggleButton value="Linkedin">Linkedin</ToggleButton>
          </div>
        </ToggleButtonGroup>

        <h3 className="text-black mt-5 mb-2 text-lg font-medium">
          Text to be repurpose *
        </h3>
        <TextField
          className="bg-white rounded-xl"
          id="outlined-multiline-static"
          label="Text"
          multiline
          rows={4}
          onChange={(e) => setInputValue(e.target.value)}
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

        <button
          className="w-full h-10 bg-black my-5 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]"
          onClick={generateResponse}
        >
          Generate (1 credit)
        </button>
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

      <div className="w-screen h-screen flex bg-white">
        <GPTResponse></GPTResponse>
      </div>
    </div>
  );
}
