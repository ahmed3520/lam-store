import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatAnthropic } from "langchain/chat_models/anthropic";
import { HuggingFaceInference } from "langchain/llms/hf";

const openAIModel = new ChatOpenAI({
  temperature: 0.1,
  openAIApiKey: process.env.OPEN_AI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
});

const anthropicModel = new ChatAnthropic({
  temperature: 0.1,
  apiKey: "YOUR-API-KEY", // In Node.js defaults to process.env.ANTHROPIC_API_KEY
});

const HuggingFaceModel = new HuggingFaceInference({
  model: "EleutherAI/gpt-neox-20b",
  apiKey: process.env.HUGGINGFACEHUB_API_KEY, // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
});
export { openAIModel, anthropicModel, HuggingFaceModel };
