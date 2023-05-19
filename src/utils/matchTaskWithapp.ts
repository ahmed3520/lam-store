import { getApps } from "./getAppsData";
import { app } from "../firebase";
import { filterApps } from "./filterApps";
import { openAIModel } from "../models/index";
interface App {
  name_for_model: string;
  description_for_model: string;
  path: string;
}

export async function matchApp(userTask: string, keywords: string[]) {
  const apps = getApps();

  let filteredApps = filterApps(apps, keywords);
  console.log(filteredApps); // [{name_of_app: "Alarmy", description_of_app: "Wake up on time with this alarm app"}]
  if (filteredApps.length <= 0) {
    return {};
  }
  const prompt = `
  Assistant is a large language model trained by OpenAI. Your task is to calculate the probability of a match between a user's request and a given list of apps. You should not behave as anything or think beyond this specific task. When given a user's request and a list of apps, return a JSON response with the app name and its probability of being a match. If the user provides an empty array of apps, you must return an empty JSON object. Your response should always be in JSON format and should not include any other information.
  apps: ${JSON.stringify(filteredApps)}. Human: ${userTask}. Assistant:
  `;
  console.log("prompt", prompt);
  const response = await openAIModel.call(prompt);
  /* let bestMatch: App | undefined;
  let bestScore = 0;
  for (const app of apps) {
    const score = calculateScore(app, response);
    if (score > bestScore) {
      bestMatch = app;
      bestScore = score;
    }
  }*/
  return { response, apps };
}

function calculateScore(app: App, response: any): number {
  // TODO: Implement a scoring function that calculates how well the app matches the response from the chatbot
  return 0;
}
