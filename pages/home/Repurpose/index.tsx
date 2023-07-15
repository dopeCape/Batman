import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
    "&.MuiToggleButton-root": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      "&.Mui-selected": {
        backgroundColor: "#009FFD", // Change the background color to #009FFD when selected
        "&:hover": {
          backgroundColor: "#009FFD", // Change the background color to blue when hovered
        },
      },
    },
  },
}));
export default function ContentCreation() {
  const [alignment, setAlignment] = useState("left");
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  let token: number = 10;
  const [open, setOpen] = useState(false);
  const [_response, setResponse] = useAtom(responseAtom);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    // Set the state to null on page load
    setResponse("");
  }, []);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const generateResponse = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    const tk = await getUserToken(user);
    console.log("&&&&&&&&&&&&&&thus " + tk);
    if (Number(tk) < token) {
      handleOpen();
      setLoading(false);
      return;
    } else {
      let usertk: number = Number(tk) - Number(token);
      setResponse("");

      await updateTokens(user, usertk);
      console.log("this is the uid " + user);

      const prompt = inputValue; // Assign inputValue to prompt variable

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
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="FaceBook" aria-label="justified">
            FaceBook
          </ToggleButton>
          <ToggleButton value="Instagram" aria-label="justified">
            Instagram
          </ToggleButton>
          <ToggleButton value="Tiktok" aria-label="justified">
            Tiktok
          </ToggleButton>
          <ToggleButton value="Twitter" aria-label="justified">
            Twitter
          </ToggleButton>
          <ToggleButton value="Linkedin" aria-label="justified">
            Linkedin
          </ToggleButton>
        </StyledToggleButtonGroup>

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
          onClick={generateResponse}
          className="w-full h-10 bg-black mt-4 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]"
        >
          <h1 className="text-white">
            {" "}
            {loading ? "Genarating..." : "Generate (10 tokens)"}
          </h1>
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
