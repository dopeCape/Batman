import React from "react";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineSave as Save, AiOutlineCopy as Copy } from "react-icons/ai";

interface Props {
  content: string;
  title: string;
}

const Tiktok = ({ content,title }: Props) => {
  return <div>
    <p className="text-black w-[90%] text-justify">{content}</p>
    </div>;
};

export default Tiktok;
