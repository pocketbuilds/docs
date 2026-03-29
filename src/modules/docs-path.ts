function stripNumericPrefix(value: string) {
  return value.replace(/^\d+-/, "");
}

export function toPublicDocId(id: string) {
  return id
    .replace(/\/index$/, "")
    .split("/")
    .map(stripNumericPrefix)
    .filter(Boolean)
    .join("/");
}

export function toPublicDocPath(id: string) {
  const publicId = toPublicDocId(id);
  return publicId ? `/${publicId}` : "/";
}
