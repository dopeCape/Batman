import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Logout } from "@/auth";
import { useTheme } from "next-themes";
import { styled } from "@mui/material/styles";
import { auth } from "@/firebase";
import { useAtom } from "jotai";
import { responseAtom } from "@/utils/store";
import { generateRealTimeToken } from "@/auth";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import coins from "../../public/navbarIcons/coins.png";
import content from "../../public/navbarIcons/content-creation.png";
import dashboard from "../../public/navbarIcons/dashboard.png";
import draft from "../../public/navbarIcons/draft.png";
import profile from "../../public/navbarIcons/profile-dropdown.png";
import schedule from "../../public/navbarIcons/schedule.png";
import user from "../../public/navbarIcons/user.png";
import Badge from "@mui/material/Badge";

export default function LoginNavBar() {
  const [showSettings, setShowSettings] = useState(false);
  const User = auth.currentUser;
  const [toggle, setToggle] = useState(true);
  const [client, setClient] = useState<typeof User | null>(null);
  const [token, setToken] = useState(0);
  const [response] = useAtom(responseAtom);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setClient(user);
    });
  }, [client]);

  useEffect(() => {
    (async () => {
      const tk = await generateRealTimeToken(client);
      setToken(tk);
    })();
  }, [response, client]);

  const toggleLogout = () => {
    setShowSettings((prev) => !prev);
  };

  const NavLink = ({ href, d, stroke, className, children }: any) => {
    const { asPath } = useRouter();

    const isActive = asPath === href;

    return (
      <div className="flex h-full items-center">
        <Link
          className={`flex flex-row items-center ${isActive
              ? "h-full items-center flex text-center px-3 dark:text-white border-b-4 dark:border-white border-[#3247CF] font-bold text-[#3247CF]"
              : "dark:text-white text-[#3E4045] font-normal"
            } font-bold cursor-pointer`}
          href={href}
        >
          {stroke && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isActive ? "20" : "15"}
              height={isActive ? "20" : "15"}
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M9.43831 20.5968H6.40207C5.32839 20.5968 4.29869 20.1703 3.53948 19.4111C2.78028 18.6519 2.35376 17.6222 2.35376 16.5485V7.43979C2.35376 6.36611 2.78028 5.3364 3.53948 4.5772C4.29869 3.81799 5.32839 3.39147 6.40207 3.39147H17.5349C18.6086 3.39147 19.6383 3.81799 20.3975 4.5772C21.1567 5.3364 21.5833 6.36611 21.5833 7.43979V10.476M8.42623 2.37939V4.40355M15.5108 2.37939V4.40355M2.35376 8.45187H21.5833M19.0531 16.1872L17.5349 17.7053"
                stroke={
                  theme === "dark" && isActive
                    ? "white"
                    : theme === "light" && isActive
                      ? "#3247CF"
                      : "#A8AAB0"
                }
                stroke-width="2.02416"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5313 22.6203C20.3261 22.6203 22.5917 20.3547 22.5917 17.5599C22.5917 14.7651 20.3261 12.4995 17.5313 12.4995C14.7366 12.4995 12.4709 14.7651 12.4709 17.5599C12.4709 20.3547 14.7366 22.6203 17.5313 22.6203Z"
                stroke={
                  theme === "dark" && isActive
                    ? "white"
                    : theme === "light" && isActive
                      ? "#3247CF"
                      : "#A8AAB0"
                }
                stroke-width="2.02416"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
          {!stroke && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={isActive && className}
              width={isActive ? "20" : "15"}
              height={isActive ? "20" : "15"}
              viewBox="0 0 25 25"
              fill={
                theme === "dark" && isActive
                  ? "white"
                  : theme === "light" && isActive
                    ? "#3247CF"
                    : "#A8AAB0"
              }
            >
              <path d={d} fill="" />
            </svg>
          )}
          {children}
        </Link>
      </div>
    );
  };
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark"); // Toggle between 'dark' and 'light';
    setToggle((prev) => !prev);
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 35,
    height: 20,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "black",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "black" : "white",

          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 15,
      height: 15,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,

      backgroundColor: theme.palette.mode === "light" ? "#D2D2D2" : "#D2D2D2",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await Logout();
      localStorage.removeItem("token");
      alert("User logged out successfully!");
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  const profileHandler = (link: any) => {
    router.push(link);
    toggleLogout();
  };

  return (
    <div className="w-full h-20 dark:bg-[#1B1D21] flex bg-[#fff] flex-row items-center md:justify-around  md:p-0 p-4 border-b-[#A8AAB0] border-b-2 border-opacity-20 ">
      <Link
        href="/homepage"
        className="font-bold text-3xl bg-gradient-to-r text-transparent from-[#00C5D7] to-[#0077BE] bg-clip-text md:w-1/4 text-center w-full"
      >
        Metridash
      </Link>
      <div className="md:flex md:flex-row hidden items-center justify-around w-full h-full ">
        <NavLink
          href="/homepage"
          d="M3.19873 6.25C3.19873 5.52065 3.48846 4.82118 4.00419 4.30546C4.51991 3.78973 5.21939 3.5 5.94873 3.5H18.4487C19.1781 3.5 19.8776 3.78973 20.3933 4.30546C20.909 4.82118 21.1987 5.52065 21.1987 6.25V12.522C20.5847 12.1285 19.9085 11.8418 19.1987 11.674V6.25C19.1987 6.05109 19.1197 5.86032 18.9791 5.71967C18.8384 5.57902 18.6476 5.5 18.4487 5.5H5.94873C5.74982 5.5 5.55905 5.57902 5.4184 5.71967C5.27775 5.86032 5.19873 6.05109 5.19873 6.25V18.75C5.19873 19.164 5.53473 19.5 5.94873 19.5H11.3727C11.5427 20.22 11.8327 20.895 12.2207 21.5H5.94873C5.21939 21.5 4.51991 21.2103 4.00419 20.6945C3.48846 20.1788 3.19873 19.4793 3.19873 18.75V6.25ZM23.1987 18C23.1987 16.5413 22.6193 15.1424 21.5878 14.1109C20.5564 13.0795 19.1574 12.5 17.6987 12.5C16.24 12.5 14.8411 13.0795 13.8096 14.1109C12.7782 15.1424 12.1987 16.5413 12.1987 18C12.1987 19.4587 12.7782 20.8576 13.8096 21.8891C14.8411 22.9205 16.24 23.5 17.6987 23.5C19.1574 23.5 20.5564 22.9205 21.5878 21.8891C22.6193 20.8576 23.1987 19.4587 23.1987 18ZM18.1987 18.5L18.1997 21.003C18.1997 21.1356 18.1471 21.2628 18.0533 21.3566C17.9595 21.4503 17.8323 21.503 17.6997 21.503C17.5671 21.503 17.4399 21.4503 17.3462 21.3566C17.2524 21.2628 17.1997 21.1356 17.1997 21.003V18.5H14.6947C14.5621 18.5 14.4349 18.4473 14.3412 18.3536C14.2474 18.2598 14.1947 18.1326 14.1947 18C14.1947 17.8674 14.2474 17.7402 14.3412 17.6464C14.4349 17.5527 14.5621 17.5 14.6947 17.5H17.1987V15C17.1987 14.8674 17.2514 14.7402 17.3452 14.6464C17.4389 14.5527 17.5661 14.5 17.6987 14.5C17.8313 14.5 17.9585 14.5527 18.0523 14.6464C18.1461 14.7402 18.1987 14.8674 18.1987 15V17.5H20.6957C20.8283 17.5 20.9555 17.5527 21.0493 17.6464C21.1431 17.7402 21.1957 17.8674 21.1957 18C21.1957 18.1326 21.1431 18.2598 21.0493 18.3536C20.9555 18.4473 20.8283 18.5 20.6957 18.5H18.1987Z"
        >
          <p className="ms-1">AI Creator Studio</p>
        </NavLink>
        <NavLink
          href="/homepage/drafts"
          d="M16.7874 8.7991L12.8039 4.81556L4.66881 12.9517L4.55039 13.0812C4.36207 13.3054 4.22464 13.5679 4.14759 13.8504L3.02823 17.9544L3.01305 18.0353C3.00449 18.1172 3.01606 18.2 3.04675 18.2764C3.07744 18.3529 3.12632 18.4207 3.18915 18.4739C3.25198 18.5272 3.32685 18.5643 3.40728 18.582C3.4877 18.5998 3.57125 18.5976 3.65066 18.5758L7.75362 17.4564L7.92062 17.4028C8.19489 17.3016 8.44487 17.1427 8.65235 16.9352L16.7874 8.7991ZM18.3744 3.22963C18.1128 2.96805 17.8023 2.76055 17.4606 2.61898C17.1188 2.47741 16.7525 2.40454 16.3826 2.40454C16.0127 2.40454 15.6464 2.47741 15.3047 2.61898C14.9629 2.76055 14.6524 2.96805 14.3908 3.22963L13.5194 4.10002L17.503 8.08356L18.3734 7.21317L18.5059 7.07148C18.9747 6.53354 19.2219 5.83774 19.1974 5.12462C19.173 4.41151 18.8789 3.73424 18.3744 3.22963ZM12.7745 3.41484H3.51605C3.38184 3.41484 3.25313 3.46816 3.15823 3.56306C3.06332 3.65796 3.01001 3.78667 3.01001 3.92088C3.01001 4.05509 3.06332 4.1838 3.15823 4.27871C3.25313 4.37361 3.38184 4.42692 3.51605 4.42692H11.7625L12.7745 3.41484ZM9.73831 6.45108H3.51605C3.38184 6.45108 3.25313 6.50439 3.15823 6.59929C3.06332 6.6942 3.01001 6.82291 3.01001 6.95712C3.01001 7.09133 3.06332 7.22004 3.15823 7.31494C3.25313 7.40984 3.38184 7.46316 3.51605 7.46316H8.72623L9.73831 6.45108ZM6.70207 9.48731L5.68999 10.4994H3.51605C3.38184 10.4994 3.25313 10.4461 3.15823 10.3512C3.06332 10.2563 3.01001 10.1276 3.01001 9.99335C3.01001 9.85914 3.06332 9.73043 3.15823 9.63553C3.25313 9.54063 3.38184 9.48731 3.51605 9.48731H6.70207Z"
        >
          <p className="ms-1">Drafts</p>
        </NavLink>

        <NavLink
          href="/homepage/Dashboard"
          d="M11.8139 21.6085H5.74144C4.62816 21.6085 3.71729 20.6977 3.71729 19.5844V5.41527C3.71729 4.30198 4.62816 3.39111 5.74144 3.39111H11.8139V21.6085ZM13.8381 21.6085H19.9105C21.0238 21.6085 21.9347 20.6977 21.9347 19.5844V12.4998H13.8381V21.6085ZM21.9347 10.4757V5.41527C21.9347 4.30198 21.0238 3.39111 19.9105 3.39111H13.8381V10.4757H21.9347Z"
        >
          <Badge badgeContent={"soon"} color="secondary">
            <p className="ms-1">Dashboard</p>
          </Badge>
        </NavLink>
        <NavLink
          href="/homepage/schedule"
          className="mt-1"
          d="M11.8139 21.6085H5.74144C4.62816 21.6085 3.71729 20.6977 3.71729 19.5844V5.41527C3.71729 4.30198 4.62816 3.39111 5.74144 3.39111H11.8139V21.6085ZM13.8381 21.6085H19.9105C21.0238 21.6085 21.9347 20.6977 21.9347 19.5844V12.4998H13.8381V21.6085ZM21.9347 10.4757V5.41527C21.9347 4.30198 21.0238 3.39111 19.9105 3.39111H13.8381V10.4757H21.9347Z"
          stroke="#A8AAB0"
        >
          <Badge badgeContent={"soon"} color="secondary">
            <p className="ms-1">Schedule</p>
          </Badge>
        </NavLink>
        <FormControlLabel
          control={
            <IOSSwitch
              onChange={handleThemeChange}
              defaultChecked={theme === "dark"}
              sx={{ m: 1 }}
            />
          }
          label=""
        />
        <Link
          href="/pricing"
          className={`bg-gradient-to-r  from-[#00C5D7] to-[#0077BE] rounded-md p-2 flex flex-row justify-between text-white`}
        >
          <Image src={coins} alt="coins" width={20} height={20} />
          <span className="ms-1 text-sm  text-white">
            {token.toLocaleString()} Tokens
          </span>
        </Link>
        <div className="relative bg-slate-300  w-10 rounded-full items-center justify-center flex">
          <div
            onClick={toggleLogout}
            className="rounded-full p-1 flex items-center justify-center cursor-pointer"
          >
            <h1 className="text-2xl w-full h-full">
              {User?.email?.charAt(0).toUpperCase()}
            </h1>
          </div>
          {showSettings && (
            <div
              className={`${theme === "light"
                  ? "flex flex-col absolute  p-2 mr-20 mt-44 w-32  md:h-38 h-50 bg-white z-10"
                  : "flex flex-col absolute  p-2 mr-20 mt-44 w-32  md:h-38 h-50 bg-black z-10"
                }`}
            >
              <button
                className="flex flex-row items-center mb-2"
                onClick={profileHandler.bind(null, "/pricing")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-badge"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                </svg>
                <span
                  className={`ms-2 ${theme === "light" ? "text-black" : "text-white"
                    } `}
                >
                  Buy Tokens
                </span>
              </button>
              <button
                className="flex flex-row items-center mb-2"
                onClick={profileHandler.bind(null, "/contact")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-badge"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                </svg>
                <span
                  className={`ms-2 ${theme === "light" ? "text-black" : "text-white"
                    } `}
                >
                  Contact us
                </span>
              </button>
              <div
                className="flex flex-row border-t-2 items-center cursor-pointer w-full h-full"
                onClick={() => {
                  handleLogout();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                  />
                </svg>
                <p
                  className={`ms-2 ${theme === "light" ? "text-black" : "text-white"
                    } `}
                >
                  Log out
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden flex">
        <div className="relative bg-slate-300  w-10 rounded-full items-center justify-center flex">
          <div
            onClick={toggleLogout}
            className="rounded-full p-1 flex items-center justify-center cursor-pointer"
          >
            <h1 className="text-2xl w-full h-full">
              {User?.email?.charAt(0).toUpperCase()}
            </h1>
          </div>
          {showSettings && (
            <div
              className={`flex flex-col absolute  p-2 mr-20 mt-52 w-32  md:h-32 h-44  z-10 bg-white`}
            >
              <Link
                href="/pricing"
                className={`bg-gradient-to-r  from-[#00C5D7] to-[#0077BE] rounded-md p-2 flex flex-row justify-between text-white`}
              >
                <span className="ms-1 text-sm  text-white">{token} Tokens</span>
              </Link>
              <button
                className="flex flex-row items-center mb-2"
                onClick={profileHandler.bind(null, "/homepage")}
              >
                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />

                <span className="ms-2 text-left text-black">
                  AI Creator Studio
                </span>
              </button>
              <button
                className="flex flex-row items-center mb-2"
                onClick={profileHandler.bind(null, "/homepage/drafts")}
              >
                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />

                <span className="ms-2 text-black">Drafts</span>
              </button>

              <div
                className="flex flex-row border-t-2 items-center cursor-pointer w-full h-full"
                onClick={() => {
                  handleLogout();
                }}
              >
                <path
                  fill-rule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                />

                <p className="ms-2 text-black">Log out</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
