import Content from "@/components/blacklist/Content";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADF | Blacklist",
  description: "Vérifier si un membre est blacklist de notre assemblée.",
};

export default async function Blacklist() {
  const blacklists = await prisma.blacklist.findMany({
    cacheStrategy: {
      ttl: 600,
      swr: 300,
    },
  });

  return (
    <main className="bg-base-200 p-8 h-[calc(100vh-65px)] flex flex-col gap-20 justify-center items-center">
      <Content blacklists={blacklists} />
    </main>
  );
}
