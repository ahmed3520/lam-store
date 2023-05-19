const { spawn } = window.require("child_process");

function runExternalApp(
  appPath: string,
  operation: string,
  ...args: string[]
): Promise<string> {
  return new Promise((resolve, reject) => {
    const appProcess = spawn(appPath, [operation, ...args]);

    appProcess.stdout.on("data", (data: any) => {
      resolve(data.toString());
    });

    appProcess.stderr.on("data", (data: any) => {
      reject(data.toString());
    });
  });
}

export default runExternalApp;
