import {
    OpenAIStream,
    OpenAIStreamPayload,
    ChatGPTMessage,
  } from "../../utils/OpenAIStream";
  
  // break the app if the API key is missing
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing Environment Variable OPENAI_API_KEY");
  }
  
  export const config = {
    runtime: "edge",
  };
  
  const handler = async (req: Request): Promise<Response> => {
    const body = await req.json();
    console.log("Prompt Chat GPT body",body);
  
    const payload: OpenAIStreamPayload = {
      // model: "gpt-3.5-turbo",
      model: "text-davinci-003",
      // messages: messages,
      prompt: body.promptText,
      temperature: 0.7,
      max_tokens: body.max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    };
    console.log("Prompt Chat GPT OpenAIStreamPayload", payload);
  
    const stream = await OpenAIStream(payload);
    return new Response(stream);
  };
  
  
  export default handler;
  