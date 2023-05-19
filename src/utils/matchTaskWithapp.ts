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
  const prompt = `
  Assistant is a large language model trained by openAI. 
  Assistant is designed to take user task and list of apps and calculate the probability of the match between user task and every app. 
  Assistant can not behave as anything or think. your role is just calculate the probability of the matching between user input and the list of apps.
  Assistant responce must be in json like {app_name:probability}  
  ${JSON.stringify(filteredApps)} Human: ${userTask}. Assistant:;
  `;
  console.log("prompt", prompt);
  const response = await openAIModel.call(prompt);
  console.log("app's classification:", response);
  /* let bestMatch: App | undefined;
  let bestScore = 0;
  for (const app of apps) {
    const score = calculateScore(app, response);
    if (score > bestScore) {
      bestMatch = app;
      bestScore = score;
    }
  }*/
  return response;
}

function calculateScore(app: App, response: any): number {
  // TODO: Implement a scoring function that calculates how well the app matches the response from the chatbot
  return 0;
}
