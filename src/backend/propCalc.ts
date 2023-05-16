import { spawn } from "child_process";

export function chatWithBot(userInput: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Spawn a child process that runs the Python script
    const child = spawn("python", ["prop.py", userInput]);
    let response = "";
    // Listen for data from the child process
    child.stdout.on("data", (data) => {
      response += data.toString();
    });
    // Listen for the end of the child process
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}`));
      } else {
        resolve(JSON.parse(response));
      }
    });
  });
}
