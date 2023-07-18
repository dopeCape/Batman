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
    <div className="bg-white py-12 px-4 md:px-12 w-full max-w-screen h-screen overflow-scroll">
      <div className="flex flex-row justify-between  ">
        <h1 className="text-gray-800 text-2xl px-5 font-sans font-medium">
          Output
        </h1>
        <div className=" items-center justify-center flex px-4  bg-gray-200 rounded-xl mr-6 py-2 ">
          <Image
            src={tokens}
            alt="token"
            width={30}
            height={30}
            className="mr-2"
          ></Image>
          <h1 id="tokenShow" className="text-black">
            {" "}
            {Number(token)} Tokens.
          </h1>
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
                  } bg-gray-200 px-4 py-8 rounded-md justify-between `}
                >
                  <p className="text-black">{e}</p>

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
        <div className="flex mx-5 my-10 bg-gray-200 px-5 py-5 rounded-md">
          <p className="text-black">response goes here</p>
        </div>
      )}
    </div>
  );
}
