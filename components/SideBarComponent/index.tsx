import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import platforms from "@/data/sideBarPlatforms";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";
import MainSelector from "../ContentForm/mainSelector";
// import InstagramIcon from '../../public/platformIcons/InstagramIcon.svg'

export default function SideBar() {
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const [focusedButton, setFocusedButton] = useState(null);
  const [openStates, setOpenStates] = React.useState(
    platforms.map(() => false)
  );
  const [option, setOption] = useState("YouTube Video");
  const [searchText, setSearchText] = useState("");
  const [form, setForm] = useState("");
  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const filteredPlatforms = platforms.filter((platform) =>
    platform.items.some((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleClick = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  const handleItemClick = (item: string) => {
    setOption(item);
    setFocusedItem(item);
  };
  return (
    <div className="flex w-full bg-black h-full ">
      <div className="flex md:w-1/3 w-1/5  h-full dark:bg-[#1B1D21] bg-[#FFFFFF] flex-col overflow-scroll">
        <div className="h-8 md:flex hidden flex-row mt-4 w-11/12 self-center dark:bg-[#232529] bg-[#F2F2F2] rounded-md mb-2">
          <SearchIcon htmlColor="#A8AAB0" className=" my-1 ml-2" />
          <input
            onChange={handleSearchChange}
            className=" dark:bg-[#232529] bg-[#F2F2F2] rounded-md  outline-none pl-2 w-full"
            placeholder="Search"
          />
        </div>

        {searchText !== "" &&
          filteredPlatforms.map((platform, i) => (
            <List key={i}>
              {platform.title.map((item, j) => (
                <button
                  onClick={() => handleItemClick(item)}
                  className={`flex w-full  pl-14 ${
                    focusedItem === item
                      ? "bg-[#232529] border-r-4 dark:border-gray-50 border-[#3247CF] dark:bg-[#232529]"
                      : "hover:bg-[#F2F2F2] hover:border-r-4 dark:border-gray-50 border-[#3247CF] dark:hover:bg-[#232529]"
                  }`}
                  key={j}
                >
                  <Image
                    className="object-contain mt-1"
                    alt={platform.name}
                    width={26}
                    height={22}
                    src={platform.icon}
                  />
                  <h1
                    className={`dark:text-white text-black py-2 pl-4 flex-row flex w-full text-left mb-4 md:text-sm text-xs ${
                      focusedItem === item ? "text-black" : ""
                    }`}
                  >
                    {item}
                  </h1>
                </button>
              ))}
            </List>
          ))}

        {platforms.map((platform, i) => (
          <List key={i}>
            <div
              className="flex flex-row items-center md:justify-around justify-start md:pr-6 pr-0 mt-2 w-full cursor-pointer	"
              onClick={() => handleClick(i)}
            >
              <div className="flex w-full h-full  md:py-2 py-1 md:px-4 px-0">
                <ListItemIcon className="flex flex-row justify-center ">
                  <Image
                    className="object-contain"
                    alt={platform.name}
                    width={26}
                    height={22}
                    src={platform.icon}
                  />
                </ListItemIcon>
                <h1 className=" md:flex hidden dark:text-white justify-center text-base font-medium">
                  {platform.name}
                </h1>
              </div>
              {openStates[i] ? (
                <ExpandLess className="dark:text-white text-black" />
              ) : (
                <ExpandMore className="dark:text-white text-black" />
              )}
            </div>
            <Collapse in={openStates[i]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {platform.title.map((item, j) => (
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`flex  w-full  md:pl-20 pl-0 ${
                      focusedItem === item
                        ? "bg-[#F2F2F2] border-r-4 dark:border-gray-50 border-[#3247CF] dark:bg-[#232529]"
                        : "hover:bg-[#F2F2F2] hover:border-r-4 dark:border-gray-50 border-[#3247CF] dark:hover:bg-[#232529]"
                    }`}
                    key={j}
                  >
                    <h1
                      className={`dark:text-white text-black py-1 pl-4 flex-row flex w-full text-left my-4 text-sm ${
                        focusedItem === item ? "text-black" : ""
                      }`}
                    >
                      {item}
                    </h1>
                  </button>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
      </div>
      <div className="flex md:w-2/3 w-4/5 dark:bg-[#232529] bg-[#F2F2F2]">
        <MainSelector platform={option} />
      </div>
    </div>
  );
}
