import React, { useState, useEffect } from "react"
import { IoSearch } from "react-icons/io5"
import { fetchUserDrafts } from "@/auth"
import { auth } from "@/firebase"
import { useAtom } from "jotai"
import Image from "next/image"
import { draftAtom } from "@/utils/store"
export default function DraftSidebar() {
  const [drafts, setDrafts] = useState<string[]>([])
  const user = auth.currentUser
  const [_draft, setDraft] = useAtom(draftAtom)
  const [searchText, setSearchText] = useState("")
  useEffect(() => {
    fetchUserDrafts(user)
      .then((userDrafts) => {
        setDrafts(userDrafts)
      })
      .catch((error) => {
        console.log("Cannot get Drafts" + error)
      })
  }, [])

  const handleDraft = (data: string) => {
    setDraft(data)
  }

  const filteredDrafts = drafts.filter((draft) =>
    draft.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value)
  }

  const extractFirstFourWords = (text: string) => {
    const words = text.split(" ")
    const firstFourWords = words.slice(0, 4).join(" ")
    return firstFourWords
  }

  const renderDrafts = () => {
    const rows: JSX.Element[] = []
    let currentRow: JSX.Element[] = []

    drafts.forEach((draft, index) => {
      const shortenedDraft = extractFirstFourWords(draft)

      currentRow.push(
        <div
          onClick={() => handleDraft(draft)}
          className="flex w-1/3 h-40 mr-2 dark:bg-[#1C1C1C] bg-[#A7A7A7] flex-col border-[#2B2B2B] dark:border overflow-hidden cursor-pointer "
        >
          <div className="flex w-full h-3/4 items-center justify-center">
            <Image
              className="object-contain mt-1"
              width={36}
              height={32}
              src={"/icons/document.png"}
              alt="document"
            />
          </div>
          <div className="flex dark:bg-[#232323] bg-white w-full h-1/4">
            <li className=" text-xs pt-1 px-2" key={index}>
              {shortenedDraft}
            </li>
          </div>
        </div>
      )

      if ((index + 1) % 3 === 0 || index === drafts.length - 1) {
        rows.push(
          <div className="flex w-full my-2  h-40 " key={index}>
            {currentRow}
          </div>
        )
        currentRow = []
      }
    })

    return rows
  }

  const searchDrafts = () => {
    const rows: JSX.Element[] = []
    let currentRow: JSX.Element[] = []

    filteredDrafts.forEach((draft, index) => {
      const shortenedDraft = extractFirstFourWords(draft)

      currentRow.push(
        <div
          onClick={() => handleDraft(draft)}
          className="flex w-1/3 h-40 mr-2 dark:bg-[#1C1C1C] bg-[#A7A7A7] flex-col border-[#2B2B2B] dark:border overflow-hidden cursor-pointer"
          key={index}
        >
          <div className="flex w-full h-3/4 items-center justify-center">
            <Image
              className="object-contain mt-1"
              width={36}
              height={32}
              src={"/icons/document.png"}
              alt="document"
            />
          </div>
          <div className="flex dark:bg-[#232323] bg-white w-full h-1/4">
            <li className="text-xs pt-1 px-2">{draft.slice(0, 35)}</li>
          </div>
        </div>
      )

      if ((index + 1) % 3 === 0 || index === filteredDrafts.length - 1) {
        rows.push(
          <div className="flex w-full my-2  h-40  " key={index}>
            {currentRow}
          </div>
        )
        currentRow = []
      }
    })

    return rows
  }

  return (
    <div className="flex h-full w-full dark:bg-[#141414] bg-[#F2F2F2] px-4 py-4 flex-col">
      <div className="flex w-2/5 h-8 dark:bg-[#232529] bg-white rounded-lg flex-row items-center px-2">
        <IoSearch></IoSearch>
        <input
          onChange={handleSearchChange}
          className=" flex w-full h-full rounded-md dark:bg-[#232529] bg-white outline-none px-1"
          placeholder="Search Drafts"
        ></input>
      </div>

      {searchText !== "" ? searchDrafts() : null}
      {searchText == "" ? (
        <div className="flex w-full h-full flex-col overflow-scroll mt-4">
          {drafts.length >= 0 ? (
            renderDrafts()
          ) : (
            <h1 className="self-center place-self-center text-gray-400">
              No drafts
            </h1>
          )}
        </div>
      ) : null}
    </div>
  )
}
