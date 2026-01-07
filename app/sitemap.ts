import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://adf.hawai1401.fr",
      lastModified: new Date(2026, 0, 3, 9, 40),
      changeFrequency: "weekly",
    },
    {
      url: "https://adf.hawai1401.fr/about",
      lastModified: new Date(2026, 0, 7, 18, 40),
      changeFrequency: "monthly",
    },
    {
      url: "https://adf.hawai1401.fr/serveurs",
      lastModified: new Date(2026, 0, 1, 18, 20),
      changeFrequency: "daily",
    },
    {
      url: "https://adf.hawai1401.fr/blacklist",
      lastModified: new Date(2026, 0, 7, 18, 40),
      changeFrequency: "monthly",
    },
  ];
}
