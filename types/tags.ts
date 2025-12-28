export const existing_tags = [
  "E_Sport",
  "Pub",
  "Rp",
  "Art",
  "Communautaire",
  "Gaming",
  "Informatique",
  "Micronation",
  "Sport",
  "Audiovisuel",
] as const;
export type tag = (typeof existing_tags)[number];