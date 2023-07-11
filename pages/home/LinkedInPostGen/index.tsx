import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import AddCircle from "@mui/icons-material/AddCircleOutlineTwoTone";
import Cancel from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GPTResponse from "@/components/GPTResponse";
import { auth } from "@/firebase";
import { updateTokens, readTokens, getUserToken } from '../../../auth';
import { useAtom } from "jotai";
import { responseAtom } from "@/utils/store";
import { Modal, Box } from "@mui/material";
import { StyleModal } from "@/components/modalStyle";
import PopUpCard from "@/components/PopUpCard";

const options = [
    "Conversational",
    "Enthusiastic",
    "Funny",
    "Professional",
    "Describe a tone",
];


const industries = [
    "Finance",
    "Healthcare",
    "Technology",
    "Marketing",
    "Education",
    "Consulting",
    "Manufacturing"
];
const post = [
    'Industry Insights',
    'Expert Interviews',
    'Career Advice',
    'Case Studies',
    'Thought Leadership Articles'

]

export default function LinkedInPostGen() {
    const [value, setValue] = useState<string | null>();
    const [value1, setValue1] = useState<string | null>();
    const [value2, setValue2] = useState<string | null>();
    const [keywords, setKeywords] = useState<string[]>([]);
    const [word, setWord] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [postType, setPostType] = useState("");
    const [industry, setIndustry] = useState("")
    const [postAboutCount, setPostAboutCount] = useState(0);
    const [targetAudienceCount, setTargetAudienceCount] = useState(0);
    const [targetAudience, setTargetAudience] = useState("");
    const [_response, setResponse] = useAtom(responseAtom);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let token: number = 10;
    const user = auth.currentUser
    const router = useRouter();

    useEffect(() => {
        // Set the state to null on page load
        setResponse("");
    }, []);

    const handleKeyword = (event: ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    };

    const addKeyword = () => {
        if (word.trim() !== "") {
            setKeywords((prevKeywords) => [...prevKeywords, word]);
            setWord("");
        }
    };

    const removeKeyword = (index: number) => {
        setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
    };

    const KeywordsComp = () => {
        return (
            <div className="flex flex-row">
                {keywords.map((word, index) => (
                    <div
                        key={index}
                        className="mx-1 px-2 border border-gray-300 bg-white flex-row flex"
                    >
                        <Cancel
                            className="bg-black w-0.5 h-0.5"
                            onClick={() => removeKeyword(index)}
                        />
                        <p className="text-gray-800">{word}</p>
                    </div>
                ))}
            </div>
        );
    };

    const TextInput = () => {
        return (
            <input
                className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500 mt-2"
                placeholder="Describe a tone"
                type="text"
            ></input>
        );
    };

    const {
        query: { platform, title },
    } = router;

    const props = {
        platform,
        title,
    };

    const prompt = `Generate ${props.title} about ${input} which is related to ${value1} industry, the post type is ${value2}  with keywords ${keywords} with tone ${value} and my target audience is ${targetAudience}.`;


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

    const handleTargetAudienceChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        const count = value.length;
        setTargetAudienceCount(count);

        if (count > 200) {
            value = value.slice(0, 200);
            setTargetAudienceCount(200);
        }

        event.target.value = value;
    };

    const generateResponse = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        // e.preventDefault();
        setLoading(true);
        setResponse("");
        const tk = await getUserToken(user)
        if (Number(tk) < token) {
            handleOpen()
            setLoading(false)
            return
        }
        else {
            let usertk: number = Number(tk) - Number(token)


            await updateTokens(user, usertk);
            const res = await fetch("/api/promptChatGPT", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: prompt,
                }),
            });

            if (!res.ok) throw new Error(res.statusText);

            const data = res.body;
            console.log("********************" + data);
            if (!data) return;

            const reader = data.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                setResponse((prev) => prev + chunkValue);
            }
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-cente h-screen">
            <div className="w-2/5 h-full flex bg-gray-200 px-10 py-14 flex-col overflow-scroll">
                <h1 className="text-black font-sans text-2xl font-medium">
                    Generate {props.title}
                </h1>
                <h3 className="text-black text-sm ">
                    Optimize your LinkedIn post for greater visibility and higher engagement.
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
                            onChange={(e) => {
                                setInput(e.target.value), handlePostAboutChange;
                            }}
                        ></input>
                        <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
                            {postAboutCount}/800
                        </p>
                    </div>


                    <h3 className="text-black text-base mb-2 mt-3">Industry*</h3>
                    <Autocomplete
                        value={value1}
                        onChange={(event: any, newValue: string | null) => {
                            setValue1(newValue);
                        }}
                        inputValue={industry}
                        onInputChange={(event, newInputValue) => {
                            setIndustry(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={industries}
                        sx={{ width: "60%", backgroundColor: "white" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Industry"
                                InputProps={{
                                    ...params.InputProps,
                                    style: {
                                        fontSize: "14px",
                                        color: "grey",
                                    },
                                }}
                            />
                        )}
                    />

                    <h3 className="text-black text-base mb-2 mt-3">Post Type*</h3>
                    <Autocomplete
                        value={value2}
                        onChange={(event: any, newValue: string | null) => {
                            setValue2(newValue);
                        }}
                        inputValue={postType}
                        onInputChange={(event, newInputValue) => {
                            setPostType(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={post}
                        sx={{ width: "60%", backgroundColor: "white" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Industry"
                                InputProps={{
                                    ...params.InputProps,
                                    style: {
                                        fontSize: "14px",
                                        color: "grey",
                                    },
                                }}
                            />
                        )}
                    />


                    <h3 className="text-black text-base mb-2 mt-3">Keywords*</h3>
                    <div className="flex flex-row">
                        <input
                            onChange={handleKeyword}
                            value={word}
                            className="w-4/5 px-2 py-2 border border-gray-300 rounded-lg text-gray-500"
                            type="text"
                            placeholder="gaming, fashion, animals"
                        ></input>
                        <button
                            onClick={addKeyword}
                            className="cursor-pointer bg-white w-1/5 flex justify-center items-center border border-gray-300 rounded-lg"
                        >
                            <AddCircle className="bg-gray-500 rounded-xl" />
                        </button>
                    </div>
                    {keywords.length > 0 ? <KeywordsComp /> : null}



                    <h3 className="text-black text-base mb-2 mt-3">Tone*</h3>
                    <Autocomplete
                        value={value}
                        onChange={(event: any, newValue: string | null) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: "60%", backgroundColor: "white" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Tone"
                                InputProps={{
                                    ...params.InputProps,
                                    style: {
                                        fontSize: "14px",
                                        color: "gray",
                                    },
                                }}
                            />
                        )}
                    />
                    {inputValue === "Describe a tone" ? <TextInput /> : null}



                    <div className="relative">
                        <h3 className="text-black text-base mb-2 mt-3">Target audience*</h3>
                        <input
                            className="w-full px-2 py-2 rounded-lg border border-gray-300 text-gray-500"
                            type="text"
                            placeholder="travellers, gamers etc."
                            onChange={(e) => {
                                setTargetAudience(e.target.value), handleTargetAudienceChange;
                            }}
                        ></input>
                        <p className="text-gray-700 text-xs absolute right-0 top-[18px]">
                            {targetAudienceCount}/200
                        </p>
                    </div>

                    <button
                        onClick={generateResponse}
                        className="w-full h-10 bg-black mt-10 rounded-lg bg-gradient-to-l from-[#009FFD] to-[#2A2A72]">
                        <h1 className="text-white" > {loading? "Genarating..." : "Generate (10 tokens)"}</h1>
                    </button>
                </form>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={StyleModal}>

                    <PopUpCard></PopUpCard>


                </Box>
            </Modal>
            <div className="w-3/5 h-screen flex bg-white">
                <GPTResponse></GPTResponse>
            </div>
        </div>
    );
}