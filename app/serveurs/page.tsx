import Content from "@/components/serveurs/Content";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ADF | Serveurs",
  description: "Les serveurs des membres de notre assemblée.",
};

export default async function Serveurs() {
  const serveurs = await prisma.serveur.findMany({
    where: {
      approuved: true,
    },
    cacheStrategy: {
      ttl: 600,
      swr: 300,
    },
  });

  return (
    <main className="p-8 flex flex-col gap-10 bg-base-200">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-semibold">Serveurs</h1>
        <p className="text-lg opacity-80">
          Voici les serveurs des membres de notre assemblée.
        </p>
      </div>
      <div className="hidden">
        <div className="badge badge-soft badge-primary border border-primary">
          Primary
        </div>
        <div className="badge badge-soft badge-secondary border border-secondary">
          Secondary
        </div>
        <div className="badge badge-soft badge-accent border border-accent">
          Accent
        </div>
        <div className="badge badge-soft badge-info border border-info">
          Info
        </div>
        <div className="badge badge-soft badge-success border border-success">
          Success
        </div>
        <div className="badge badge-soft badge-warning border border-warning">
          Warning
        </div>
        <div className="badge badge-soft badge-error border border-error">
          Error
        </div>
      </div>
      <Content serveurs={serveurs} />
    </main>
  );
}
