/**
 * Client-side mirror of WORKSHOP_HUB_ENABLED.
 * Must be set at build time as VITE_WORKSHOP_HUB_ENABLED=true to show the hub.
 * Default (unset): hub is disabled — safe for public launch.
 */
export function isWorkshopHubEnabledClient() {
  return import.meta.env.VITE_WORKSHOP_HUB_ENABLED === "true";
}
