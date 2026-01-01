import { Button } from "@/components/animate-ui/components/buttons/button";
import Hr from "@/components/serveurs/Hr";
import prisma from "@/lib/prisma";
import textToMarkdown from "@/lib/textToMarkdown";
import { cn } from "@/lib/utils";
import { Props, tag } from "@/types/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

export default async function Page({ params }: Props) {
  const { id } = await params;

  const guild = await prisma.serveur.findUnique({
    where: {
      id,
    },
  });

  if (!guild) return notFound();

  const tags_class: Record<tag, string> = {
    E_Sport: "primary",
    Pub: "secondary",
    Rp: "accent",
    Art: "info",
    Communautaire: "success",
    Gaming: "warning",
    Informatique: "error",
    Micronation: "success",
    Sport: "primary",
    Audiovisuel: "warning",
  };

  return (
    <main className="bg-base-200 p-4">
      <div className="bg-base-300 m-4 p-4 rounded-lg flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-4 col-span-3">
          {guild.logoURL ? (
            <Image
              src={guild.logoURL}
              width={100}
              height={100}
              alt="Logo"
              className="rounded-full border border-accent"
            />
          ) : (
            <div className="w-12.5 h-12.5 rounded-full border border-accent flex items-center justify-center">
              {guild.nom.charAt(0)}
            </div>
          )}
          <h4 className="font-semibold text-xl">{guild.nom}</h4>
          <div className="flex justify-center items-center">
            <Button
              variant={"outline"}
              className="w-fit self-center rounded-lg text-lg py-5"
            >
              <Link href={guild.link}>Rejoindre</Link>
            </Button>
          </div>
        </div>
        <Hr />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="p-4 text-lg badge badge-soft border border-white">
            {guild.member_count} membres
          </div>
          <div className="p-4 text-lg badge badge-soft border border-white">
            {guild.createAt.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          {guild.tags &&
            guild.tags.length > 0 &&
            guild.tags.map((t, i) => (
              <div
                className={cn(
                  "p-4 text-lg badge badge-soft border",
                  `badge-${tags_class[t]}`,
                  `border-${tags_class[t]}`
                )}
                key={i}
              >
                {t}
              </div>
            ))}
        </div>
        <Hr />
        <div className="flex flex-col px-2">
          {textToMarkdown(guild.description)}
        </div>
      </div>
    </main>
  );
}
