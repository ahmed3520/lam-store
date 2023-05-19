const { spawn } = window.require("child_process");
const path = window.require("path");
function probCalc(userInput: string): Promise<any> {
  const appsDir = path.join("src", "backend", "prob.py");

  return new Promise((resolve, reject) => {
    // Spawn a child process that runs the Python script
    const child = spawn("python", [appsDir, "get_prob", userInput]);
    console.log("child=>", child);
    let response = "";
    // Listen for data from the child process
    child.stdout.on("data", (data: any) => {
      response += data.toString();
      console.log("prop calc response=>", response);
    });
    // Listen for errors from the child process
    child.on("error", (err: any) => {
      console.error("Failed to start child process:", err);
      reject(err);
    });
    // Listen for data on the stderr stream
    child.stderr.on("data", (data: any) => {
      console.error(`stderr: ${data}`);
    });
    // Listen for the end of the child process
    child.on("close", (code: any) => {
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}`));
      } else {
        resolve(JSON.parse(response));
      }
    });
  });
}

export { probCalc };
