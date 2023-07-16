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

export default function GPTResponse() {
  const [response] = useAtom(responseAtom);
  const [token, setToken] = useState(0);
  const [color, setColor] = useState("gray-400");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<null | any>(null);

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
      console.log(JSON.stringify(response.split("\n")));
    })();
  }, [response, user]);

  function copyText(entryText: string) {
    handleTooltipOpen();
    navigator.clipboard.writeText(entryText);
    setTimeout(() => {
      handleTooltipClose();
    }, 2000);
  }

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
            {Number(token)} Tokens
          </h1>
        </div>
      </div>
      {response ? (
        response
          .split("\n" || "\r\n" || "\r")
          .filter((e) => e)
          .map((e, i) => {
            if (e) {
              return (
                <div
                  className={`flex mx-5 ${
                    e.match(/[0-9]\./) ? "mb-2" : "mb-10"
                  } ${
                    i == 0 ? "mt-10" : "mt-0"
                  } bg-gray-200 px-4 py-5 rounded-md justify-between `}
                >
                  <p className="text-black">{e}</p>
                  {/* <button className={`object-contain text-${color}`} onClick={() => copyText(e)}>
                Copy
              </button> */}
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
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