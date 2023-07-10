// import {
//     OpenAIStream,
//     OpenAIStreamPayload,
//     ChatGPTMessage,
//   } from "../../utils/OpenAIStream";
  
//   // break the app if the API key is missing
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error("Missing Environment Variable OPENAI_API_KEY");
//   }
   
//   export const config = {
//     runtime: "edge",
//   };
  
//   const handler = async (req: Request): Promise<Response> => {
//     const body = await req.json();
//     console.log("Prompt Chat GPT body",body);
  
//     const payload: OpenAIStreamPayload = {
//       // model: "gpt-3.5-turbo",
//       model: "text-davinci-003",
//       // messages: messages,
//       prompt: body.prompt,
//       temperature: 0.7,
//       max_tokens: 100,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       stream: true,
//       n: 1,
//     };
//     console.log("Prompt Chat GPT OpenAIStreamPayload", payload);
    
//     const stream = await OpenAIStream(payload);
    
//     return new Response(stream);
    
//   };
  
  
//   export default handler;
  
// import {
//     OpenAIStream,
//     OpenAIStreamPayload,
//     ChatGPTMessage,
//   } from "../../utils/OpenAIStream";
  
//   // break the app if the API key is missing
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error("Missing Environment Variable OPENAI_API_KEY");
//   }
   
//   export const config = {
//     runtime: "edge",
//   };
  
//   const handler = async (req: Request): Promise<Response> => {
//     const body = await req.json();
//     console.log("Prompt Chat GPT body",body);
  
//     const payload: OpenAIStreamPayload = {
//       // model: "gpt-3.5-turbo",
//       model: "text-davinci-003",
//       // messages: messages,
//       prompt: body.prompt,
//       temperature: 0.7,
//       max_tokens: 100,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       stream: true,
//       n: 1,
//     };
//     console.log("Prompt Chat GPT OpenAIStreamPayload", payload);
    
//     const stream = await OpenAIStream(payload);
    
//     return new Response(stream);
    
//   };
  
  
//   export default handler;
  
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/open-ai-stream";

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OpenAI API Key");

export const config = {
   runtime: "edge",
 };

 const handler = async (req: Request) => {
  const { data } = (await req.json()) as { data: string };
   console.log("Prompt Chat GPT body",data);

  if (!data) return new Response("Missing prompt", { status: 400 });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: data }],
    // prompt: data,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 250,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
};
export default handler;
