import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { responseAtom } from "@/utils/store";
import GPTResponse from "@/components/GPTRespone";
import { auth } from "@/firebase";
import { updateTokens, readTokens, getUserToken } from "../../../auth";
import { Modal, Box } from "@mui/material";
import { StyleModal } from "@/components/modalStyle";
import PopUpCard from "@/components/PopUpCard";

export default function CaptionGen() {
  const [postAboutCount, setPostAboutCount] = useState(0);
  const [_response, setResponse] = useAtom(responseAtom);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let token: number = 5;
  const user = auth.currentUser;
  const prompt = `Generate continuous hashtags for my post about ${input} and dont add numbers for every hashtag`;
  const {
    query: { platform, title },
  } = router;

  useEffect(() => {
    // Set the state to null on page load
    setResponse("");
  }, [setResponse]);
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

  const generateResponse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <div className="md:w-2/5 md:h-screen flex bg-gray-200 px-10 py-16 flex-col ">
        <h1 className="text-black font-sans text-2xl font-medium">
          Generate {props.title}
        </h1>
        <h3 className="text-black text-sm ">
          Optimize your HashTags for greater visibility and higher engagement.
        </h3>
        <form onSubmit={generateResponse} className="my-4">
          <div className="relative">
            <h3 className="text-black text-base mb-2">
              what&apos;s your post about?*
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

          <button className="w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]">
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
      <div className="w-screen h-screen flex bg-white">
        <GPTResponse></GPTResponse>
      </div>
    </div>
  );
}
