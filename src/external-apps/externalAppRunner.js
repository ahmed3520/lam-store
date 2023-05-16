const { spawn } = require("child_process");
function runExternalApp(appPath, operation, ...args) {
  return new Promise((resolve, reject) => {
    const appProcess = spawn(appPath, [operation, ...args]);

    appProcess.stdout.on("data", (data) => {
      resolve(data.toString());
    });

    appProcess.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });
}

module.exports = runExternalApp;
