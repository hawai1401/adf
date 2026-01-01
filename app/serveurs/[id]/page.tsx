import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const guild = await prisma.serveur.findUnique({
    where: {
      id,
    },
  });

  if (!guild)
    return {
      title: "404 - Not found",
      description: "This guild isn't in the database.",
    };

  return {
    title: guild.nom,
    description: guild.description,
    openGraph: {
      title: guild.nom,
      description: guild.description,
      url: "https://adf.com",
      siteName: "ADF",
      images: [
        {
          url: guild.logoURL ?? "",
          width: 630,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guild.nom,
      description: guild.description,
      images: [guild.logoURL ?? ""],
    },
  };
}

export default function Page() {
  return notFound();
}
