import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";

export default function CaptionGen() {
  const [postAboutCount, setPostAboutCount] = useState(0);

  const router = useRouter();

  const {
    query: { platform, title },
  } = router;

  const props = {
    platform,
    title,
  };

  const handlePostAboutChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    const count = value.length;
    setPostAboutCount(count);

    if (count > 800) {
      value = value.slice(0, 800);
      setPostAboutCount(800);
    }

    event.target.value = value;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-2/5 h-screen flex bg-gray-200 px-10 py-16 flex-col ">
        <h1 className="text-black font-sans text-2xl font-medium">
          Generate {props.title}
        </h1>
        <h3 className="text-black text-sm ">
          Optimize your HashTags for greater visibility and higher engagement.
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="my-4">
          <div className="relative">
            <h3 className="text-black text-base mb-2">
              What's your post about?*
            </h3>
            <input
              className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500"
              type="text"
              placeholder="gaming, fashion, animals etc."
              onChange={handlePostAboutChange}
            ></input>
            <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
              {postAboutCount}/800
            </p>
          </div>

          <button className="w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]">
            Generate (1 credit)
          </button>
        </form>
      </div>
      <div className="w-3/5 h-screen flex bg-white"></div>
    </div>
  );
}
