import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { responseAtom } from "@/utils/store";
import { auth } from "@/firebase";
import { generateRealTimeToken } from "../auth";
import tokens from "../public/icons/coins.png";
import { updateTokens, readTokens, getUserToken } from "../auth";
import { set } from "firebase/database";

export default function GPTResponseVideo() {
  const [response] = useAtom(responseAtom);
  const [token, setToken] = useState(0);
  const [color, setColor] = useState("gray-400");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<null | any>(null);
  const [_response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [Pdata, setData] = useState<String>("");
  const [index, setIndex] = useState<Number>(0);
  let finalToken = 20;
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [user]);

  useEffect(() => {
    (async () => {
      const tk = await generateRealTimeToken(user);
      setToken(Number(tk));
    })();
  }, [response, user, loading]);

  function copyText(entryText: string) {
    handleTooltipOpen();
    navigator.clipboard.writeText(entryText);
    setTimeout(() => {
      handleTooltipClose();
    }, 2000);
  }

  const generateResponse = async (value: String) => {
    setLoading(true);
    const tk = await getUserToken(user);
    if (Number(tk) < finalToken) {
      setLoading(false);
      return;
    } else {
      let usertk: number = Number(tk) - Number(finalToken);
      // e.preventDefault();
      setResponse("");

      await updateTokens(user, usertk);
      const res = await fetch("/api/promptChatGPT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: `generate script for video ${value} `,
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

  const handleGenerate = async (e: String, i: Number) => {
    setIndex(i);
    await setData(e);
    await generateResponse(e);
  };

  return (
    <div className="dark:bg-[#1B1D21] bg-white py-6 px-2 md:px-4 w-full max-w-screen h-screen overflow-scroll">
      <div className="flex flex-col justify-between  ">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="dark:text-white text-[#3247CF] text-2xl px-5 font-sans font-medium">
          Output
          
        </h1>
        <Button
          variant="contained"
          startIcon={
            <div
              style={{
                backgroundImage: `url('/images/draft.png')`, // Assuming 'draft.png' is in the 'public/images' folder
                width: "24px",
                height: "24px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          }
          sx={{
            textTransform: "none",
            backgroundColor: "#D0D8F5",
            color: "#1E388B",
            "&:hover": {
              backgroundColor: "#D0D8F5",
            },
          }}
        >
          Save as Draft
        </Button>
      </div>
      <hr className="my-4 #DBD7D7" />

      <div className="flex flex-row justify-end space-x-2 mx-5 mb-4">
        <Button
          variant="text"
          style={{
            textDecoration: "underline",
            textTransform: "none",
            color: "grey",
          }}
        >
          Edit
        </Button>
        <Button
          variant="text"
          style={{
            textDecoration: "underline",
            textTransform: "none",
            color: "grey",
          }}
        >
          Repurpose
        </Button>
      </div>

      </div>
      {response ? (
        response
          .split("\n" || "\r\n" || "\r" || "\n\r")
          .filter((e) => e)
          .map((e, i) => {
            if (e) {
              return (
                <div
                  key={i}
                  className={`flex flex-col mx-5 ${
                    e.match(/[0-9]\./) ? "mb-2" : "mb-10"
                  } ${
                    i == 0 ? "mt-10" : "mt-0"
                  } dark:bg-[#232529] bg-[#F2F2F2] px-4 py-8 rounded-md justify-between `}
                >
                  <p >{e}</p>

                  <div
                    className={`flex flex-row ${
                      i % 2 !== 0 ? "justify-between" : "justify-end"
                    }   mt-2 pr-6`}
                  >
                    {i % 2 !== 0 ? (
                      <Button
                        onClick={() => {
                          handleGenerate(e, i);
                        }}
                        className="h-10 w-15 "
                      >
                        Generate Script
                      </Button>
                    ) : null}
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                      <div className="w-10 h-5 ">
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={handleTooltipClose}
                          open={open}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title="Copied!"
                        >
                          <Button onClick={() => copyText(e)}>Copy</Button>
                        </Tooltip>
                      </div>
                    </ClickAwayListener>
                  </div>
                  {_response && index == i ? (
                    <p className="text-black">{_response}</p>
                  ) : null}
                </div>
              );
            }
          })
      ) : (
        <div className="flex mx-5 my-10 dark:bg-[#232529] bg-[#F2F2F2] px-5 py-5 rounded-md">
          <p>response goes here</p>
        </div>
      )}
    </div>
  );
}
