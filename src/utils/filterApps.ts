interface App {
  name_of_app: string;
  description_of_app: string;
}

export function filterApps(apps: App[], keywords: string[]): App[] {
  let lowerCaseKeywords = keywords.map((keyword) => keyword.toLowerCase());
  return apps.filter((app) => {
    let name = app.name_of_app.toLowerCase();
    let description = app.description_of_app.toLowerCase();
    return lowerCaseKeywords.some(
      (keyword) => name.includes(keyword) || description.includes(keyword)
    );
  });
}
