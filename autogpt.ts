import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_ORGANIZATION_ID;

const openai = new OpenAI({ apiKey, organization });

type Params = OpenAI.Chat.ChatCompletionCreateParams;
// type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;
type Response = OpenAI.Chat.Completions.ChatCompletionMessage;

const model = "gpt-4";

async function generateGPTResponse(prompt: string): Promise<Response> {
  const params: Params = {
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model,
  };

  const response = await openai.chat.completions.create(params);

  return response.choices[0].message;
}

generateGPTResponse("Translate 'Hello, world!' to Spanish").then((response) => {
  console.log(response);
});
