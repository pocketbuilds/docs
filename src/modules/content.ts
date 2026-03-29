import {
  getCollection as getCollectionAstro,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

function numericPrefix(value: string) {
  const match = value.match(/^(\d+)-/);
  if (!match) return;
  return Number.parseInt(match[1]!, 10);
}

function orderKeyFromId(id: string) {
  const [first, ...rest] = id.split("/");
  const last = rest.at(-1) ?? first ?? id;

  const groupOrder = numericPrefix(first ?? "") ?? Number.MAX_SAFE_INTEGER;
  const pageOrder = numericPrefix(last) ?? Number.MAX_SAFE_INTEGER;

  return { groupOrder, pageOrder };
}

export async function getCollection<T extends CollectionKey>(
  ...args: Parameters<typeof getCollectionAstro<T>>
) {
  const entries = await getCollectionAstro(...args);
  const filtered =
    args[0] === "docs" && import.meta.env.PROD
      ? entries.filter(
          (entry) =>
            (entry as CollectionEntry<"docs">).data.stability !== "dev",
        )
      : entries;

  return filtered.toSorted((a, b) => {
    const aKey = orderKeyFromId(a.id);
    const bKey = orderKeyFromId(b.id);
    return (
      aKey.groupOrder - bKey.groupOrder ||
      aKey.pageOrder - bKey.pageOrder ||
      a.id.localeCompare(b.id)
    );
  });
}

const docs = await getCollection("docs");

export function getSiblingDoc(
  doc: CollectionEntry<"docs">,
  direction: "previous" | "next",
) {
  const index = docs.findIndex((d) => d.id === doc.id);
  if (index === -1) {
    return;
  }
  return direction === "previous" ? docs[index - 1] : docs[index + 1];
}
