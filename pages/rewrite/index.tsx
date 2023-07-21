import { generateText } from "@/services/API";
import React, { useEffect, useState } from "react";
import { IoCreate as Create } from "react-icons/io5";
import { AiOutlineLoading as Loading } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import path from "path";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const Rewrite = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>();

  useEffect(() => {
    console.log("newContent", newContent);
  }, [newContent]);

  const rewriteContent = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      content: { value: string };
      contentType: { value: string };
      tone: { value: string };
    };
    const promptText = `Rewrite the following content:\n"${target.content.value}"\nPlease convert it into a ${target.contentType.value} format with a ${target.tone.value} tone.`;

    let max_tokens = 200;
    if (target.contentType.value === "Blog Post") {
      max_tokens = 2000;
    }
    const result = await generateText(promptText, max_tokens);
    setNewContent(result);
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex flex-row justify-center items-center">
      {/* Content Wizard */}
      <div className="w-3/4 flex flex-col gap-4">
        <div className="rounded-lg border-b border-gray-200 bg-white shadow-xl p-4 ">
          <h1 className="text-2xl font-bold text-black">Rewrite Content</h1>

          <form onSubmit={rewriteContent}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Original Content
                  </label>
                  <textarea
                    id="content"
                    rows={30}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Paste your content here
                "
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="contentType"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select content type:
                  </label>
                  <div className="mt-2">
                    <select
                      id="contentType"
                      name="contentType"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue="Blog Post"
                    >
                      <option>Blog Post</option>
                      <option>Facebook Ads</option>
                      <option>Facebook Post</option>
                      <option>LinkedIn Post</option>
                      <option>Tweet</option>
                      <option>Threads</option>
                      <option>YouTube Description</option>
                      <option>Instagram Caption</option>
                      <option>TikTok Caption</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="tone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select tone:
                  </label>
                  <div className="mt-2">
                    <select
                      id="tone"
                      name="tone"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue="Blog Post"
                    >
                      <option>Informative</option>
                      <option>Funny</option>
                    </select>
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
                        <Loading
                          className="animate-spin"
                          color="white"
                          size={20}
                        />
                      )}
                      Rewrite
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <h2 className="block text-sm font-medium leading-6 text-gray-900">
                  New Content
                </h2>
                <p>{newContent}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rewrite;
