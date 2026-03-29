import { getCollection } from "@/modules/content";
import type { CollectionEntry } from "astro:content";

export interface Section {
  label: string;
  docs: CollectionEntry<"docs">[];
}

function numericPrefix(value: string) {
  const match = value.match(/^(\d+)-/);
  if (!match) return;
  return Number.parseInt(match[1]!, 10);
}

function stripNumericPrefix(value: string) {
  return value.replace(/^\d+-/, "");
}

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) =>
      part.length <= 3
        ? part.toUpperCase()
        : part.slice(0, 1).toUpperCase() + part.slice(1),
    )
    .join(" ");
}

function orderKeyFromId(id: string) {
  const last = id.split("/").at(-1) ?? id;
  return numericPrefix(last) ?? Number.MAX_SAFE_INTEGER;
}

const allDocs = await getCollection("docs");
const grouped = new Map<string, CollectionEntry<"docs">[]>();

for (const doc of allDocs) {
  const group = doc.id.includes("/")
    ? (doc.id.split("/")[0] ?? "general")
    : "general";
  const bucket = grouped.get(group) ?? [];
  bucket.push(doc);
  grouped.set(group, bucket);
}

export const commonSections: Section[] = Array.from(grouped.entries())
  .toSorted(([a], [b]) => {
    if (a === "general") return -1;
    if (b === "general") return 1;
    const aOrder = numericPrefix(a) ?? Number.MAX_SAFE_INTEGER;
    const bOrder = numericPrefix(b) ?? Number.MAX_SAFE_INTEGER;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return stripNumericPrefix(a).localeCompare(stripNumericPrefix(b));
  })
  .map(([group, docs]) => ({
    label:
      group === "general"
        ? "General"
        : titleCaseFromSlug(stripNumericPrefix(group)),
    docs: docs.toSorted(
      (a, b) =>
        orderKeyFromId(a.id) - orderKeyFromId(b.id) || a.id.localeCompare(b.id),
    ),
  }));
