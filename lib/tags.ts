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
export type tags = (typeof existing_tags)[number];