export type ThumbSize = 160 | 320 | 640 | 960;

export function thumb(src: string | undefined | null, size: ThumbSize = 640): string {
  const s = src ?? "/images/placeholder.jpg";
  if (!s.startsWith("/images/mountains/")) return s;
  return s.replace("/images/mountains/", `/images/mountains/thumbs/${size}/`);
}

export function thumbSrcset(src: string | undefined | null, sizes: ThumbSize[] = [320, 640, 960]): string {
  if (!src || !src.startsWith("/images/mountains/")) return "";
  return sizes.map((s) => `${thumb(src, s)} ${s}w`).join(", ");
}
