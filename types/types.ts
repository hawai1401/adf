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

export type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type field = { name: string; value: string; inline?: boolean };
