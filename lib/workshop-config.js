import { readFileSync } from "fs";
import { join } from "path";

export function loadWorkshopConfig() {
  const configPath = join(process.cwd(), "moralcraftsmanship-platform/workshop-config.json");
  return JSON.parse(readFileSync(configPath, "utf8"));
}

/** Shared workshop password — from env only, never from config file. */
export function getWorkshopPassword() {
  const value = process.env.WORKSHOP_PASSWORD?.trim();
  if (!value) {
    throw new Error(
      "WORKSHOP_PASSWORD ontbreekt. Zet dit secret in Vercel Environment Variables (niet in de repo)."
    );
  }
  return value;
}

/** Preview / voorproef code — from env only. */
export function getVoorproefPassword() {
  const value = process.env.WORKSHOP_VOORPROEF_PASSWORD?.trim();
  if (!value) {
    throw new Error(
      "WORKSHOP_VOORPROEF_PASSWORD ontbreekt. Zet dit secret in Vercel Environment Variables (niet in de repo)."
    );
  }
  return value;
}
