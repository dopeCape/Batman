import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useAtom } from "jotai";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { responseAtom } from "@/utils/store";
import { auth } from "@/firebase";
import { generateRealTimeToken } from "../auth";
import tokens from "../public/icons/coins.png";
import { Modal, Box } from "@mui/material";
import { PlatformModal } from "@/components/modalStyle";
import TwitterTime from "public/bestTimes/twitter.webp";
import FacebookTime from "public/bestTimes/facebook.webp";
import InstaTime from "public/bestTimes/insta.webp";
import YoutubeTime from "public/bestTimes/youtube.webp";
import SaveIcon from "@mui/icons-material/Save"; // Import SaveIcon from Material-UI

type StaticImport = StaticImageData | string;

export default function GPTResponse({
  platform,
}: {
  platform?: string | string[] | undefined;
}) {
  const [response] = useAtom(responseAtom);
  const [token, setToken] = useState(0);
  const [color, setColor] = useState("gray-400");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<null | any>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
    handleImageSelection();
  };
  const handleClose = () => setOpenModal(false);
  const [PlatformImage, setPlatfromImage] = useState<StaticImport>("");
  const [Socialplatform, setSocialPlatform] = useState<
    string | string[] | undefined
  >("");
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      handleBestTime();
    });
  }, [user]);

  useEffect(() => {
    (async () => {
      const tk = await generateRealTimeToken(user);
      setToken(Number(tk));
    })();
  }, [response, user]);

  function copyText(entryText: string) {
    handleTooltipOpen();
    navigator.clipboard.writeText(entryText);
    setTimeout(() => {
      handleTooltipClose();
    }, 2000);
  }

  const handleBestTime = async () => {
    (await platform) ? setSocialPlatform(platform) : setSocialPlatform("");
  };

  const handleImageSelection = () => {
    if (Socialplatform == "twitter") {
      setPlatfromImage(TwitterTime);
    } else if (Socialplatform == "facebook") {
      setPlatfromImage(FacebookTime);
    } else if (Socialplatform == "instagram") {
      setPlatfromImage(InstaTime);
    } else if (Socialplatform == "youtube") {
      setPlatfromImage(YoutubeTime);
    } else {
      setPlatfromImage(YoutubeTime);
    }
  };

  return (
    <div className="bg-white py-6 px-2 md:px-4 w-full max-w-screen h-screen">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-[#3247CF] text-2xl px-5 font-sans font-medium">
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

      <div className="flex flex-col items-center mt-10">
        {response ? (
          response
            .split("\n")
            .filter((e) => e)
            .map((e, i) => {
              if (e) {
                return (
                  <div
                    key={i}
                    className={`flex mx-5 ${
                      e.match(/[0-9]\./) ? "mb-2" : "mb-10"
                    } ${
                      i == 0 ? "mt-10" : "mt-0"
                    } bg-gray-200 px-4 py-5 rounded-md justify-between `}
                  >
                    <p className="text-black">{e.replace(/"/g, "")}</p>
                    <div className="flex flex-col">
                      {Socialplatform === "rewrite" ||
                      Socialplatform === "repurpose" ? null : (
                        <Button
                          color="error"
                          onClick={() => {
                            handleOpen();
                          }}
                          className="mr-2"
                        >
                          Post
                        </Button>
                      )}
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
                  </div>
                );
              }
            })
        ) : (
          <div className="flex mx-5 my-10 px-5 py-5 rounded-md">
            <p className="text-black text-center">response goes here</p>
          </div>
        )}
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={PlatformModal}>
          <div className="w-full h-5/6 flex">
            <Image
              src={PlatformImage}
              alt="My Image"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            className={`w-full h-10 bg-black mt-4 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]`}
          >
            <h1 className="text-white">Continue</h1>
          </button>
        </Box>
      </Modal>
    </div>
  );
}
