import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Assemblée des fondateurs",
    short_name: "ADF",
    description:
      "Découvrez ADF, une communauté Discord regroupant des fondateurs et gérants de serveurs FR. Consultez nos statistiques et explorez les avantages de nous rejoindre.",
    start_url: "/",
    orientation: "portrait",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "fr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
