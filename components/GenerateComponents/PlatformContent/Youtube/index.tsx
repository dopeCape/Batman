import React from "react";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineSave as Save, AiOutlineCopy as Copy } from "react-icons/ai";

interface Props {
  title: string;
  outline: any;
  seoDescription: string;
  tags: string;
  thumbnailIdeas?: string[];
}

const Youtube = ({
  title,
  outline,
  seoDescription,
  tags,
  thumbnailIdeas,
}: Props) => {
  const lengthIndex = outline.indexOf("Length:");
  const topicIndex = outline.indexOf("Topics:");
  const scriptIndex = outline.indexOf("Script:");
  const lengthText = outline
    .slice(lengthIndex + "Length:".length, topicIndex)
    .trim();
  const topicsText = outline
    .slice(topicIndex + "Topics:".length, scriptIndex)
    .trim();
  const scriptText = outline.slice(scriptIndex + "Script:".length).trim();

  const generatedTags = tags.split(",").map((tag) => tag.trim());

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-black">Content Outline</h1>
        <button className="px-4 py-1 bg-blue-900 rounded-lg text-white hover:bg-blue-400">
          <div className="flex gap-2 justify-center items-center">
            <Save color="white" size={20} />
            Save Content
          </div>
        </button>
      </div>
      <div className="flex flex-col gapy">
        <h1 className="text-lg font-medium text-black pt-2 w-[90%] text-justify">
          <span className="text-black">Title:</span> <span className="font-normal text-black w-[90%] text-justify">{title}</span>
        </h1>
        <h2 className="text-lg font-medium pt-1">
        <span className="text-black">Length:</span> <span className="font-normal text-black w-[90%] text-justify">{lengthText}</span>
        </h2>
        <h1 className="text-[18px] font-medium text-black pt-2">Outline:</h1>
        <p className="whitespace-break-spaces text-black w-[90%] text-justify">{topicsText}</p>
        <h2 className="text-lg font-medium text-black pt-2">Script:</h2>
        <p className="whitespace-break-spaces text-black w-[90%] text-justify">{scriptText}</p>
        <h2 className="text-lg font-medium text-black pt-2">
          <div className="flex items-center">
            SEO Description
            <Copy color="gray" size={20} />
          </div>
        </h2>
        <p className="whitespace-break-spaces text-black w-[90%] text-justify">{seoDescription}</p>
        <h2 className="text-lg font-medium text-black pt-2">Tags:</h2>
        <p className="whitespace-break-spaces text-black w-[90%] text-justify">
          <span>{generatedTags}</span>
        </p>
      </div>
    </>
  );
};

export default Youtube;
