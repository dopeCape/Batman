import { Inter } from "next/font/google";
import { TargetAudience, VideoCategory } from "@/utils/contants";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineLoading as Loading } from "react-icons/ai";
import { Dispatch, useEffect, useState } from "react";
import SuggestionList from "@/components/GenerateComponents/SuggestionList";
import { generateText } from "./../../../services/API/index";
import ContentDetails from "@/components/GenerateComponents/ContentDetails";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";

import path from "path";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import generateContentDetail from "@/components/HOC/generateContentDetail";
import { getSession } from "next-auth/react";
import { IPlatform, ISelection } from "../../../interface/GenerateInterface";

import { getValue, fetchAndActivate } from "firebase/remote-config";
import { remoteConfig } from "../../../firebaseConfig";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getConfigValue } from "@/services/firebase/remoteConfig";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const platform = query.platform;
  const filePath = path.join(process.cwd(), "generatecontent.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString());
  const platformIndex = objectData.findIndex(
    (obj: any) => obj.name === platform
  );

  console.log({ ...objectData[platformIndex], ...{ session } });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { ...objectData[platformIndex], ...{ session } },
  };
};

export default function GeneratePlatform(props: IPlatform) {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ [key: string]: string }>({});
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element | null>();
  const [platformPrompts, setPlatformPrompts] = useState<any>({});
  const [promptCost, setPromptCost] = useState<any>({});
  const dynamicRoute = useRouter().asPath;

  useEffect(() => {
    setSuggestions([]);
    setContent(null);
    setSelected({});
  }, [dynamicRoute]);

  // const getConfigValue = async (
  //   key: string,
  //   setStateCallback: Dispatch<any>,
  //   saveLocal: boolean = false
  // ) => {
  //   console.log(`Getitng Config for ${key}`);
  //   const firebaseRemoteConfig = remoteConfig;
  //   if (firebaseRemoteConfig) {
  //     await fetchAndActivate(firebaseRemoteConfig).then(() => {
  //       const data = JSON.parse(getValue(firebaseRemoteConfig, key).asString());
  //       console.log(`Getitng Config for ${key}`, data);
  //       setStateCallback(data);
  //       if (saveLocal) {
  //         localStorage.setItem(key, data);
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    (async () => {
      const promptsConfig = localStorage.getItem("contentPrompts");
      const costConfig = localStorage.getItem("metridashTokens");
      console.log("Generate promptCost", promptCost);
      console.log("Generate platformPrompts", platformPrompts);
      if (!promptsConfig) {
        await getConfigValue("contentPrompts", setPlatformPrompts, true);
      } else {
        setPlatformPrompts(JSON.parse(promptsConfig));
      }
      if (!costConfig) {
        await getConfigValue("metridashTokens", setPromptCost, true);
      } else {
        setPromptCost(JSON.parse(costConfig));
      }
    })();
  }, []);

  const generateSuggestions = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    let promptText = props.initialPrompt;
    const target = e.target as typeof e.target & {
      [key: string]: { value: string };
    };
    let selection: { [key: string]: string } = {};
    for (let option of props.selection) {
      promptText += option.promptText.replace(
        "--value--",
        target[option.name].value
      );
      selection[option.name] = target[option.name].value;
    }
    promptText += props.keywordsPrompt.replace(
      "--value--",
      target.keywords.value
    );
    selection.keywords = target.keywords.value;
    console.log("selection", selection);
    promptText += props.endPrompt;
    const result = await generateText(promptText, 100);
    const ideas = result
      .split("\n")
      .filter((line) => line.trim().match(/^\d\./));

    console.log("Generated Ideas", ideas);
    setSelected(selection);
    setSuggestions(ideas);
    setLoading(false);
  };

  const generateContent = async (contentTitle: string) => {
    const title = contentTitle.substring(contentTitle.indexOf(".") + 1).trim();
    setLoadingContent(true);
    console.log("GENERATING CONTENT FOR ", title);
    console.log("Generate Content content Title", title);
    setContent(await generateContentDetail(props.name, title, selected));
    setLoadingContent(false);
  };

  return (
    <div className="min-h-screen flex flex-row justify-center items-center">
      {/* Content Wizard */}
      <div className="w-3/4 flex flex-col gap-4">
        <div className="rounded-lg border-b border-gray-200 bg-white shadow-xl p-4 ">
          <h1 className="text-2xl font-bold text-black">{props.title}</h1>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-10 pt-4"
            onSubmit={generateSuggestions}
          >
            {props.selection.map((item: ISelection) => {
              return (
                <div key={item.name}>
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {item.text}
                  </label>
                  <div className="mt-2">
                    <select
                      id={item.name}
                      name={item.name}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={item.options[0]}
                    >
                      {item.options.map((val) => (
                        <option key={`${item.name}-option-${val}`}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-medium leading-6 text-gray-900 "
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
            contentLoading={loadingContent}
            suggestions={suggestions}
            onClickGenerateOutline={generateContent}
          />
        )}
        {content && <ContentDetails>{content}</ContentDetails>}
      </div>
    </div>
  );
}
