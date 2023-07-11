import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { generateRealTimeToken, getRealTimeToken, getUserToken } from "../auth";
import { auth } from "@/firebase";
import Image from "next/image";
import tokens from '../public/icons/coins.png'

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
      <div className="flex flex-row justify-between  ">
        <h1 className="text-gray-800 text-2xl px-5 font-sans font-medium">
          Output
        </h1>
        <div className=" items-center justify-center flex px-4  bg-gray-200 rounded-xl mr-6 py-2 ">
          <Image
            src={tokens}
            alt="token"
            width={30}
            height={30}
            className="mr-2"
            
          ></Image>
          <h1 id="tokenShow" className="text-black"> {Number(token)} Tokens</h1>
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
