import { OpenAIStream, OpenAIStreamPayload } from "../../utils/open-ai-stream";

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OpenAI API Key");

export const config = {
  runtime: "edge",
};

const handler = async (req: Request) => {
  const { data } = (await req.json()) as { data: string };

  if (!data) return new Response("Missing prompt", { status: 400 });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: data }],
    // prompt: data,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};
export default handler;
