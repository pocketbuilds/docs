export const SKELETON_COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "surface",
  "success",
  "warning",
  "error",
] as const;

export type SkeletonColor = (typeof SKELETON_COLORS)[number];

export const SKELETON_TONES = [
  "500",
  "50-950",
  "100-900",
  "200-800",
  "300-700",
  "400-600",
  "600-400",
  "700-300",
  "800-200",
  "900-100",
  "950-50",
] as const;

export type SkeletonTone = (typeof SKELETON_TONES)[number];

export type SkeletonColorWithDefault = "default" | SkeletonColor;
export type SkeletonToneWithNone = "none" | SkeletonTone;

export type SkeletonPreset =
  | "filled"
  | "outlined"
  | "tonal"
  | "ghost"
  | "custom";

export function buildSkeletonPresetCompoundVariants(opts: {
  defaultFilledClass: string;
  defaultOutlinedClass: string;
  defaultTonalClass: string;
  defaultGhostClass?: string;
  filledClass: (color: SkeletonColor, tone: SkeletonTone) => string;
  outlinedClass: (color: SkeletonColor, tone: SkeletonTone) => string;
  tonalClass: (color: SkeletonColor) => string;
  ghostClass?: (color: SkeletonColor) => string;
}) {
  const variants: Array<Record<string, unknown>> = [
    { preset: "filled", color: "default", class: opts.defaultFilledClass },
    { preset: "outlined", color: "default", class: opts.defaultOutlinedClass },
    { preset: "tonal", color: "default", class: opts.defaultTonalClass },
  ];

  if (opts.defaultGhostClass) {
    variants.push({
      preset: "ghost",
      color: "default",
      class: opts.defaultGhostClass,
    });
  }

  for (const color of SKELETON_COLORS) {
    variants.push({ preset: "tonal", color, class: opts.tonalClass(color) });
    if (opts.ghostClass) {
      variants.push({ preset: "ghost", color, class: opts.ghostClass(color) });
    }
  }

  for (const color of SKELETON_COLORS) {
    for (const tone of SKELETON_TONES) {
      variants.push({
        preset: "filled",
        color,
        tone,
        class: opts.filledClass(color, tone),
      });
      variants.push({
        preset: "outlined",
        color,
        tone,
        class: opts.outlinedClass(color, tone),
      });
    }
  }

  return variants;
}
