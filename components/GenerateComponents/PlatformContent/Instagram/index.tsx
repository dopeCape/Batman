import React from "react";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineSave as Save, AiOutlineCopy as Copy } from "react-icons/ai";

interface Props {
  content: string[];
}

const Instagram = ({ content }: Props) => {
  const [contentIdea, script, audioSuggestion, captionsAndHashtags] = content;
  return (
    <div>
      <h4 className="text-black text-[18px] font-bold">Content Idea:</h4>
      <p className="text-black w-[90%] text-justify">{contentIdea}</p>
      <h4 className="text-black text-[18px] pt-5 font-bold">Script:</h4>
      <p className="text-black w-[90%] text-justify">{script}</p>
      <h4 className="text-black text-[18px] pt-5 font-bold">
        Audio Suggestion:
      </h4>
      <p className="text-black w-[90%] text-justify">{audioSuggestion}</p>
      <h4 className="text-black text-[18px] pt-5 font-bold">
        Captions and Hashtags:
      </h4>
      <p className="text-black w-[90%] text-justify">{captionsAndHashtags}</p>
    </div>
  );
};

export default Instagram;
