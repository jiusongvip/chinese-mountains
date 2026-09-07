export type ThumbSize = 160 | 640 | 960;

export function thumb(src: string | undefined | null, size: ThumbSize = 640): string {
  const s = src ?? "/images/placeholder.jpg";
  if (!s.startsWith("/images/mountains/")) return s;
  return s.replace("/images/mountains/", `/images/mountains/thumbs/${size}/`);
}
