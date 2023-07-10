
import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";

export default function GPTResponse() {
  const [response] = useAtom(responseAtom);

  return (
    <div className="bg-white p-12 w-full max-w-screen h-screen">
      <h1 className="text-gray-800 text-2xl px-5 font-sans font-medium">Output</h1>
      <div className="flex mx-5 my-10 bg-gray-200 px-5 py-5 rounded-md">
      <p className="text-black">
        {response ? response : "Response goes here..."}
      </p>

      </div>
    </div>
  );
}