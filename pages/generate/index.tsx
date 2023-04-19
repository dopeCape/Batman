import Image from "next/image";
import { Inter } from "next/font/google";
import { TargetAudience, VideoCategory } from "@/utils/contants";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineLoading as Loading } from "react-icons/ai";
import { useState } from "react";
import SuggestionList from "@/components/GenerateComponents/SuggestionList";
import { generateText } from "./../../services/API/index";
import ContentDetails from "@/components/GenerateComponents/ContentDetails";

const inter = Inter({ subsets: ["latin"] });

interface Outline {
  lengthText: string;
  topicsText: string;
  scriptText: string;
}

export interface Content {
  title: string;
  outline: Outline;
  seoDescription: string;
  tags: string[];
  thumbnailIdeas: string[];
}

export default function Generate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [content, setContent] = useState<Content | undefined>();

  const generateSuggestions = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      category: { value: string };
      audience: { value: string };
      keywords: { value: string };
    };
    const category = target.category.value;
    const audience = target.audience.value;
    const keywords = target.keywords.value;

    let promptText =
      "Please generate 5 video topic ideas for a YouTube channel";

    if (category) {
      promptText += ` focusing on the niche: ${category}`;
    }

    if (audience) {
      promptText += `, targeting the audience: ${audience}`;
    }

    if (keywords) {
      promptText += `, using the keywords: "${keywords}"`;
    }

    promptText +=
      ". List the ideas in a numbered format, with each idea separated by a newline:";

    console.log("Generating video topic ideas with prompt:", promptText);

    const result = await generateText(promptText, 100);
    const ideas = result
      .split("\n")
      .filter((line) => line.trim().match(/^\d\./));

    console.log("Generated Ideas", ideas);
    setSuggestions(ideas);
    setLoading(false);
  };

  const generateContent = async (contentTitle: string) => {
    const title = contentTitle.substring(contentTitle.indexOf(".") + 1).trim();
    console.log("GENERATING CONTENT FOR ", title);
    console.log("Generate Content content Title", title);
    const [outline, seoDescription, tags, thumbnailIdeas] = await Promise.all([
      generateOutline(title),
      generateSeoDescription(title),
      generateTags(title),
      generateThumbnailIdeas(title),
    ]);

    console.log(
      "Generated Content outline",
      title,
      outline,
      seoDescription,
      tags,
      thumbnailIdeas
    );

    setContent({
      title,
      outline,
      seoDescription,
      tags,
      thumbnailIdeas,
    });
  };

  const generateOutline = async (contentTitle: string): Promise<Outline> => {
    const promptText = `Create an outline for a YouTube video with the title "${contentTitle}". Include the length of the content, topics that should be covered, and a brief script.`;
    console.log("Generating outline with prompt:", promptText);

    const generatedText = await generateText(promptText, 3000);
    console.log("generatedText", generatedText);
    const lengthIndex = generatedText.indexOf("Length:");
    const topicIndex = generatedText.indexOf("Topics:");
    const scriptIndex = generatedText.indexOf("Script:");
    const lengthText = generatedText
      .slice(lengthIndex + "Length:".length, topicIndex)
      .trim();
    const topicsText = generatedText
      .slice(topicIndex + "Topics:".length, scriptIndex)
      .trim();
    const scriptText = generatedText
      .slice(scriptIndex + "Script:".length)
      .trim();

    console.log("FormattedText", { lengthText, topicsText, scriptText });
    return { lengthText, topicsText, scriptText };
  };

  const generateSeoDescription = async (
    contentTitle: string
  ): Promise<string> => {
    const promptText = `Create an SEO-optimized description for a YouTube video with the title "${contentTitle}". The description should be in the optimal range of 200-300 words.`;

    console.log("Generating SEO description with prompt:", promptText);

    const generatedText = await generateText(promptText, 300);
    return generatedText;
  };

  const generateTags = async (contentTitle: string): Promise<string[]> => {
    const promptText = `Generate 5-10 relevant tags for a YouTube video with the title "${contentTitle}".`;

    console.log("Generating tags with prompt:", promptText);

    const generatedText = await generateText(promptText, 100);
    console.log("Generating tags generatedText:", generatedText);
    const tags = generatedText.split(",").map((tag) => tag.trim());
    // const tags = generatedText.split("\n").map((tag) => {
    //   const removedSpaces = tag.replace(/\s/g, "");
    //   return `${tag
    //     .substring(tag.indexOf(".") + 1)
    //     .trim()}`;
    // });
    return tags;
  };

  const generateThumbnailIdeas = async (
    contentTitle: string
  ): Promise<string[]> => {
    const promptText = `Suggest 3 ideas for creating a highly engaging thumbnail for a YouTube video with the title "${contentTitle}".`;

    console.log("Generating thumbnail ideas with prompt:", promptText);

    const generatedText = await generateText(promptText, 100);
    const ideas = generatedText
      .split("\n")
      .filter((line) => line.trim().match(/^\d\./));
    return ideas.map((idea) => idea.substring(idea.indexOf(".") + 1).trim());
  };

  return (
    <main className=" min-h-screen flex flex-row justify-center items-center p-10 gap-10 ">
      {/* Content Wizard */}
      <div className="w-3/4 flex flex-col gap-4">
        <div className="rounded-lg border-b border-gray-200 bg-white shadow-xl p-4 ">
          <h1 className="text-2xl font-bold">Content Wizard</h1>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-10 pt-4"
            onSubmit={generateSuggestions}
          >
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={VideoCategory[0]}
                >
                  {VideoCategory.map((val) => (
                    <option key={`category-${val}`}>{val}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="audience"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Target Audience
              </label>
              <div className="mt-2">
                <select
                  id="audience"
                  name="audience"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={TargetAudience[0]}
                >
                  {TargetAudience.map((val) => (
                    <option key={`audience-${val}`}>{val}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content Keywords {`(Comma separated keywords)`}
              </label>
              <div className="mt-2">
                <input
                  type="keywords"
                  name="keywords"
                  id="keywords"
                  className="block w-full rounded-md border-0 pl-3 pr-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Content Keywords"
                />
              </div>
            </div>
            <div className="flex justify-start items-end">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-900 rounded-lg text-white hover:bg-blue-400"
              >
                <div className="flex gap-2">
                  {!loading ? (
                    <Create color="white" size={20} />
                  ) : (
                    <Loading className="animate-spin" color="white" size={20} />
                  )}
                  Generate Content Suggestions
                </div>
              </button>
            </div>
          </form>
        </div>
        {(loading || suggestions.length > 0) && (
          <SuggestionList
            loading={loading}
            suggestions={suggestions}
            onClickGenerateOutline={generateContent}
          />
        )}
        {content && (
          // <div>
          <ContentDetails content={content} />
          //   <p>{content.seoDescription}</p>
          // </div>
        )}
      </div>
    </main>
  );
}
