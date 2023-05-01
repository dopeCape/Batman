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
      <h4>Content Idea:</h4>
      <p>{contentIdea}</p>
      <h4>Script:</h4>
      <p>{script}</p>
      <h4>Audio Suggestion:</h4>
      <p>{audioSuggestion}</p>
      <h4>Captions and Hashtags:</h4>
      <p>{captionsAndHashtags}</p>
    </div>
  );
};

export default Instagram;
