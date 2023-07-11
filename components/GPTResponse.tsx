import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { generateRealTimeToken, getRealTimeToken, getUserToken } from "../auth";
import { auth } from "@/firebase";

export default function GPTResponse() {
  const [response] = useAtom(responseAtom);
  const [token, setToken] = useState(0);
  const user = auth.currentUser;

  useEffect(() => {
    (async () => {
      const tk = await generateRealTimeToken(user);
      setToken(Number(tk));
    })();
  }, [response]);

  return (
    <div className="bg-white p-12 w-full max-w-screen h-screen">
      <div className="flex flex-row ">
        <h1 className="text-gray-800 text-2xl px-5 font-sans font-medium">
          Output
        </h1>
        <div className=" items-center justify-center flex px-4 py-1">
          <h1 id="tokenShow">Tokens {Number(token)}</h1>
        </div>
      </div>
      <div className="flex mx-5 my-10 bg-gray-200 px-5 py-5 rounded-md">
        <p className="text-black">
          {response ? response : "Response goes here..."}
        </p>
      </div>
    </div>
  );
}
