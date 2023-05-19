import runExternalApp from "./externalAppRunner";

async function executeExternalApp(
  appPath: string,
  operation: string,
  ...args: string[]
): Promise<string> {
  try {
    const result = await runExternalApp(appPath, operation, ...args);
    console.log(`Result from external app: ${result}`);
    return result;
  } catch (error) {
    console.error(`Error from external app: ${error}`);
    throw error;
  }
}

export default executeExternalApp;
