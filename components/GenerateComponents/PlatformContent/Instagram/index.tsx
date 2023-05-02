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
      <h4 className="text-black">Content Idea:</h4>
      <p className="text-black">{contentIdea}</p>
      <h4 className="text-black">Script:</h4>
      <p className="text-black">{script}</p>
      <h4 className="text-black">Audio Suggestion:</h4>
      <p className="text-black">{audioSuggestion}</p>
      <h4 className="text-black">Captions and Hashtags:</h4>
      <p className="text-black">{captionsAndHashtags}</p>
    </div>
  );
};

export default Instagram;
