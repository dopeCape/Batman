import React from "react";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineSave as Save, AiOutlineCopy as Copy } from "react-icons/ai";
// import { Content } from "@/pages/generate";

interface Props {
  // content: Content;
  children: JSX.Element;
}

const ContentDetails = (props: Props) => {
  // let { title, outline, seoDescription, tags, thumbnailIdeas } = props.content;

  return (
    <div className="rounded-lg border-b border-gray-200 bg-white shadow-xl p-4">
      {props.children}
      {/* <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Content Outline</h1>
        <button className="px-4 py-1 bg-blue-900 rounded-lg text-white hover:bg-blue-400">
          <div className="flex gap-2 justify-center items-center">
            <Save color="white" size={20} />
            Save Content
          </div>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">
          Title: <span className="font-normal">{title}</span>
        </h1>
        <h2 className="text-lg font-medium">
          Length: <span className="font-normal">{outline.lengthText}</span>
        </h2>
        <h2 className="text-lg font-medium">Outline</h2>
        <p className="whitespace-break-spaces">{outline.topicsText}</p>
        <h2 className="text-lg font-medium">Script</h2>
        <p className="whitespace-break-spaces">{outline.scriptText}</p>
        <h2 className="text-lg font-medium">
          <div className="flex">
            SEO Description
              <Copy color="gray" size={20} />
          </div>
        </h2>
        <p className="whitespace-break-spaces">{seoDescription}</p>
        <h2 className="text-lg font-medium">Tags</h2>
        <p className="whitespace-break-spaces ">
          <span>{tags}</span>
        </p>
      </div> */}
    </div>
  );
};

export default ContentDetails;
