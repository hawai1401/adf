import Content from "@/components/blacklist/Content";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADF | Blacklist",
  description: "Vérifier si un membre est blacklist de notre assemblée.",
  openGraph: {
    title: "ADF | Blacklist",
    description: "Vérifier si un membre est blacklist de notre assemblée.",
    url: `https://adf.com/blacklist`,
    siteName: "ADF",
  },
  twitter: {
    title: "ADF | Blacklist",
    description: "Vérifier si un membre est blacklist de notre assemblée.",
  },
  keywords: ["ADF", "Blacklist"],
};

export default async function Blacklist() {
  const blacklists = await prisma.blacklist.findMany({
    cacheStrategy: {
      ttl: 600,
      swr: 300,
    },
  });

  return (
    <main className="bg-base-200 p-8 min-h-[calc(100vh-65px)] flex flex-col gap-20 justify-center items-center">
      <div className="flex flex-col gap-4 text-center rounded-lg p-4">
        <h1 className="text-4xl font-semibold">Blacklists</h1>
        <p className="text-lg opacity-80">
          Vérifier si un Utilisateur est blacklist de notre groupe
        </p>
      </div>
      <Content blacklists={blacklists} />
    </main>
  );
}
