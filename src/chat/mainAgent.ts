import { OpenAI } from "langchain/llms/openai";
import { BufferWindowMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

const TEMPLATE = `Assistant is a large language model trained by OpenAI. Assistant is designed to take user input and classify it. If it's a normal message, Assistant must reply normally. If it's a task, Assistant must return the task name as task:task_name. Overall, Assistant is a friendly chatbot that takes user input and classifies it. Assistant can not behave as anything or do any task(except the very very smal aone). {history} Human: {human_input} Assistant:`;

const promptA = new PromptTemplate({
  template: TEMPLATE,
  inputVariables: ["human_input", "history"],
});
console.log(process.env.REACT_APP_OPEN_AI_API_KEY, process.env.API_KEY);
const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
});
const memory = new BufferWindowMemory({ k: 1 });
const chain = new ConversationChain({
  llm: model,
  memory: memory,
  prompt: promptA,
  verbose: true,
});

export async function getUserResponse(userInput: string) {
  const response = await chain.call({ human_input: userInput });
  return response;
}
