import { useEffect, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { useAtom } from "jotai"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import { responseAtom, platformAtom } from "@/utils/store"
import { auth } from "@/firebase"
import { generateRealTimeToken } from "../auth"
import tokens from "../public/icons/coins.png"
import { Modal, Box } from "@mui/material"
import { PlatformModal } from "@/components/modalStyle"
import TwitterTime from "public/bestTimes/twitter.webp"
import FacebookTime from "public/bestTimes/facebook.webp"
import InstaTime from "public/bestTimes/insta.webp"
import YoutubeTime from "public/bestTimes/youtube.webp"
import SaveIcon from "@mui/icons-material/Save" // Import SaveIcon from Material-UI
import GPTResponseVideo from "./GPTResponseVideo"
import { getUserToken } from "../auth"
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { updateTokens } from "../auth"
import { addDraft } from "../auth"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
type StaticImport = StaticImageData | string

export default function GPTResponse({
  platform,
}: {
  platform?: string | string[] | undefined
}) {
  const [response] = useAtom(responseAtom)
  const [platformAt] = useAtom(platformAtom)
  const [token, setToken] = useState(0)
  const [color, setColor] = useState("gray-400")
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<null | any>(null)
  const [openModal, setOpenModal] = useState(false)
  const [Pdata, setData] = useState<String>("")
  const [index, setIndex] = useState<Number>(0)
  const [_response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [fullData, setFullData] = useState("")
  const currentUser = auth.currentUser
  let finalToken = 20
  const handleOpen = () => {
    setOpenModal(true)
    handleImageSelection()
  }
  const handleClose = () => setOpenModal(false)
  const [PlatformImage, setPlatfromImage] = useState<StaticImport>("")
  const [Socialplatform, setSocialPlatform] = useState<
    string | string[] | undefined
  >("")
  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [user])

  useEffect(() => {
    handleBestTime()
  }, [])

  useEffect(() => {
    ;(async () => {
      const tk = await generateRealTimeToken(user)
      setToken(Number(tk))
      setFullData(response)
    })()
  }, [response, user])

  function copyText(entryText: string) {
    handleTooltipOpen()
    navigator.clipboard.writeText(entryText)
    setTimeout(() => {
      handleTooltipClose()
    }, 2000)
  }

  const generateResponse = async (value: String) => {
    setLoading(true)
    const tk = await getUserToken(user)
    if (Number(tk) < finalToken) {
      setLoading(false)
      return
    } else {
      let usertk: number = Number(tk) - Number(finalToken)
      // e.preventDefault();
      setResponse("")

      await updateTokens(user, usertk)
      const res = await fetch("/api/promptChatGPT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: `generate script for video ${value} `,
        }),
      })

      if (!res.ok) throw new Error(res.statusText)

      const data = res.body

      if (!data) return

      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        setResponse((prev) => prev + chunkValue)
      }
      setLoading(false)
    }
  }

  interface AlertData {
    severity: "success" | "error"
    message: string
  }
  interface AlertCopyData {
    severity: "info"
    message: string
  }
  const [alert, setAlert] = useState<AlertData | null>(null)
  const [Copyalert, setCopyAlert] = useState<AlertCopyData | null>(null)

  const handleAddDraft = async (data: any) => {
    try {
      await addDraft(currentUser, data)
      setAlert({ severity: "success", message: "Draft added successfully" })
    } catch (error) {
      setAlert({ severity: "error", message: "Error adding draft" })
    }
  }

  const handleBestTime = async () => {
    platform ? setSocialPlatform(platform) : setSocialPlatform("")
  }

  const handleImageSelection = () => {
    if (Socialplatform == "twitter") {
      setPlatfromImage(TwitterTime)
    } else if (Socialplatform == "facebook") {
      setPlatfromImage(FacebookTime)
    } else if (Socialplatform == "instagram") {
      setPlatfromImage(InstaTime)
    } else if (Socialplatform == "youtube") {
      setPlatfromImage(YoutubeTime)
    } else {
      setPlatfromImage(YoutubeTime)
    }
  }

  return (
    <div className="dark:bg-[#232529] bg-[#F2F2F2] w-full px-10 pt-10 pb-20   items-center flex flex-col h-screen ">
      <div className="flex flex-col items-center h-full w-full dark:bg-[#1B1D21] pb-6 bg-white rounded-md overflow-scroll">
        <div>

        {response ? (
          response
            .split("\n")
            .filter((e) => e)
            .map((e, i) => {
              if (e) {
                return (
                  <div
                    key={i}
                    // className={`flex flex-col justify-between h-full w-full mx-5 ${
                    //   e.match(/[0-9]\./) ? "mb-2" : "mb-4"
                    // } ${
                    //   i == 0 ? "mt-2" : "mt-0"
                    // }  px-4 py-0 rounded-md justify-between w-full  `}
                    className=" px-4 py-4"
                  >
                    <p className="">{e.replace(/"/g, "")}</p>
                   
                  </div>
                )
              }
            })
        ) : (
          <div className="flex w-full h-full items-center justify-center mt-40">
            <p className="text-[#D2D2D2]  text-center">Response shows here</p>
          </div>
        )}
        </div>
        {response?
        <div className="flex flex-row self-end bottom-0">
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
                            title="Saved To Drafts!"
                          >
                            <Button
                              onClick={() => handleAddDraft(response)}
                              className="mr-2"
                            >
                              <SaveTwoToneIcon></SaveTwoToneIcon>
                            </Button>
                          </Tooltip>

                          <Snackbar
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            open={!!alert}
                            autoHideDuration={3000}
                            onClose={() => setAlert(null)}
                          >
                            <Alert
                              onClose={() => setAlert(null)}
                              severity={alert?.severity}
                            >
                              {alert?.message}
                            </Alert>
                          </Snackbar>
                        </div>
                      </ClickAwayListener>
                      <div>
                        <Button onClick={() => copyText(response)}>
                          <ContentCopyIcon></ContentCopyIcon>
                        </Button>
                      </div>
                    </div>:null}
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
  )
}
