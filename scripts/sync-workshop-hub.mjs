import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "moralcraftsmanship-platform/hub-apps.json");
const targetPath = join(root, "public/data/workshop/hub-apps.json");

const data = JSON.parse(readFileSync(sourcePath, "utf8"));
const beslotenApps = data.apps.filter(
  (app) => app.categorie === "besloten" && app.status === "live" && app.url
);

mkdirSync(dirname(targetPath), { recursive: true });
writeFileSync(
  targetPath,
  JSON.stringify({ generated_at: new Date().toISOString(), apps: beslotenApps }, null, 2) + "\n"
);

console.log(`Workshop hub: ${beslotenApps.length} besloten apps → public/data/workshop/hub-apps.json`);
