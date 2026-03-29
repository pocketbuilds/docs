export const SITE_THEMES = [
  "catppuccin",
  "cerberus",
  "concord",
  "crimson",
  "fennec",
  "hamlindigo",
  "legacy",
  "mint",
  "modern",
  "mona",
  "nosh",
  "nouveau",
  "pine",
  "reign",
  "rocket",
  "rose",
  "sahara",
  "seafoam",
  "terminus",
  "vintage",
  "vox",
  "wintry",
] as const;

export type SiteTheme = (typeof SITE_THEMES)[number];

export const SITE_MODES = ["system", "light", "dark"] as const;
export type SiteMode = (typeof SITE_MODES)[number];

export const SITE_THEME: SiteTheme = "fennec";
export const SITE_MODE: SiteMode = "dark";
