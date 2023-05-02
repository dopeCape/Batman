export const generateText = async (
  promptText: string,
  max_tokens: number
): Promise<string> => {
  try {
    console.log("generateText generating");
    const response = await fetch("/api/promptChatGPT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promptText, max_tokens }),
    });
    console.log("generateText response",response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return "";
    }
    console.log("generateText streaming data");

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let outputString = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      outputString = outputString + chunkValue;
    }

    return outputString;
  } catch (error) {
    console.log("generateText error", error);
    return "Error";
  }
};
