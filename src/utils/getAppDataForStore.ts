const fs = window.require("fs");
const path = window.require("path");
interface App {
  name_of_app: string;
  description_of_app: string;
  path: string;
  logo_url: string;
}

export function getAppDataForStore(): App[] {
  const appsDir = path.join("src", "apps");

  const appDirs = fs.readdirSync(appsDir);
  const apps: App[] = [];
  for (const appDir of appDirs) {
    const appPath = path.join(appsDir, appDir);
    const manifestPath = path.join(appPath, "manifest.json");
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      apps.push({
        name_of_app: manifest.name_for_human,
        description_of_app: manifest.description_for_human,
        logo_url: manifest.logo_url,
        path: appPath,
      });
    }
  }
  console.log("appsDir=>", apps);

  return apps;
}
