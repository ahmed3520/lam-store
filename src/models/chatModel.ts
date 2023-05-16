import { OpenAI } from "langchain/llms/openai";
import { VectorStoreRetrieverMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { HuggingFaceModel } from ".";
import { ChainTool } from "langchain/tools";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
const vectorStore = new MemoryVectorStore(new HuggingFaceInferenceEmbeddings());
const memory = new VectorStoreRetrieverMemory({
  // 1 is how many documents to return, you might want to return more, eg. 4
  vectorStoreRetriever: vectorStore.asRetriever(1),
  memoryKey: "history",
});

const model = new OpenAI({ temperature: 0.9 });
const prompt =
  PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Relevant pieces of previous conversation:
{history}

(You do not need to use these pieces of information if not relevant)

Current conversation:
Human: {input}
AI:`);
const chain = new LLMChain({ llm: model, prompt, memory });
const memoryChain = new ChainTool({
  name: "memory-history",
  description:
    "This tool retrieves historical data to assist you in recalling previous conversations and providing more accurate responses.”",
  chain: chain,
});
const tools = [memoryChain];
async function name(message: String) {
  const executor = await initializeAgentExecutorWithOptions(
    tools,
    HuggingFaceModel,
    {
      agentType: "zero-shot-react-description",
      verbose: true,
    }
  );
}

console.log("Loaded agent.");
