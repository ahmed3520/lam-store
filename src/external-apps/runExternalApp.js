const runExternalApp = require("./externalAppRunner");

async function executeExternalApp(appPath, operation, ...args) {
  try {
    const result = await runExternalApp(appPath, operation, ...args);
    console.log(`Result from external app: ${result}`);
    return result;
  } catch (error) {
    console.error(`Error from external app: ${error}`);
    throw error;
  }
}
module.exports = executeExternalApp;
