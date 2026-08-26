/** Workshop Hub is only live when explicitly enabled. Default: off. */
export function isWorkshopHubEnabled() {
  return process.env.WORKSHOP_HUB_ENABLED === "true";
}
