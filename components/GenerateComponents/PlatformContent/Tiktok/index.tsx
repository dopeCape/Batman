import React from "react";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineSave as Save, AiOutlineCopy as Copy } from "react-icons/ai";

interface Props {
  content: string;
}

const Tiktok = ({ content }: Props) => {
  return <div>{content}</div>;
};

export default Tiktok;
